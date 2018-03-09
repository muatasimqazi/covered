/* eslint-disable */
import { app } from './base';
import { computed, observable } from 'mobx';
import md5 from "blueimp-md5"; // for gravatar email hash

const auth = app.auth();
let db = app.database();

const date = new Date();

class DataStore {

  @observable isLoggedIn = false;
  @observable isBusy = true;
  @observable currentUser = null;
  @observable usersObj = {};
  @observable teamsObj = {};
  @observable targetDate = date;
  @observable isOpenDialog = true;
  @observable currUserViaSupervisor = null;
  @observable selectedEmployee = {};
  @observable isSuccess = false;
  @observable error = '';

  @computed get currentTeamName() {
    const team = this.teamsObj[this.currentUser.teamId];
    return team ? team.teamName : '???';
  }
  @computed get usersArray() {
    const result = [];
    for (let k in this.usersObj) {
      result.push(this.usersObj[k]);
    }
    return result;
  }
  @computed get employeesArray() {
    return this.usersArray.filter(u => u.role === 'employee');
  }
  @computed get supervisorsArray() {
    return this.usersArray.filter(u => u.role === 'supervisor');
  }

  @computed get formatTargetDate() {
    let day = this.targetDate.getDate();
    let month = this.targetDate.getMonth() + 1;
    let year = this.targetDate.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    return `${year}${month}${day}`;
  }

  @computed get employeesWorking() {
    return this.employeesArray.filter(employee =>
      employee.shifts[this.formatTargetDate] !== undefined
    );
  }

  @computed get employeesNotWorking() {
    return this.employeesArray.filter(employee =>
      employee.shifts[this.formatTargetDate] === undefined
    );
  }

  @computed get requestActions() {
    let actionOptions = [];
    if (this.currentUser.role === 'supervisor') {
      if (!this.currUserViaSupervisor) {
        // do nothing
      } else if (!this.currUserViaSupervisor.shifts || !this.currUserViaSupervisor.shifts[this.formatTargetDate]) {
        actionOptions.push('add');
      } else if (this.currUserViaSupervisor.shifts[this.formatTargetDate]) {
        actionOptions.push('remove');
      } 
    } else {
      if (!this.currentUser.shifts || !this.currentUser.shifts[this.formatTargetDate]) {
        actionOptions.push('add');
      } else if (this.currentUser.shifts[this.formatTargetDate]) {
        actionOptions.push('remove');
      }
    }
    return actionOptions;
  }

  @computed get coverageObject() {
    this.teamsObj && this.currentUser && this.currentUser.teamId
    ? this.teamsObj[this.currentUser.teamId].coverage
    : {}
  }

  constructor() {
    // real-time listeners
    auth.onAuthStateChanged(firebaseUser => {
      this.isBusy = false;
      if (firebaseUser) {
        this.email = firebaseUser.email;
        this.uid = firebaseUser.uid;

        // Find user by email:
        db.ref('test/users').orderByChild('email').equalTo(this.email)
          .once('value', (snapshot, error) => {
            if (error) {
              return console.log('Error:', error.message);
            }
            const obj = snapshot.val();
            this.currentUser = obj && obj[Object.keys(obj)[0]];
            // Now load users on same team:
            if (this.currentUser) {
              db.ref('test/users').orderByChild('teamId').equalTo(this.currentUser.teamId)
                .on('value', (snapshot, error) => {
                  if (error) {
                    return console.log('Error:', error.message);
                  }
                  this.usersObj = snapshot.val() || {};
                });
            }
            else {
              this.usersObj = {};
            }
            this.isLoggedIn = true;
          });
        db.ref('test/teams').on('value', (snapshot, error) => {
          if (error) {
            console.log('Error:', error);
            return;
          }
          this.teamsObj = observable(snapshot.val() || {});
        });
      }
      else {
        this.isLoggedIn = false;
        this.email = '';
      }
    });
  }

  createEmployeeAccountFromRoster(employee, cb) {
    this.isBusy = true;
    this.isSuccess = false;
    this.error = '';
    let photoURLHash = md5(employee.email.toLowerCase().trim());
    let employeePhotoUrl = `https://www.gravatar.com/avatar/${photoURLHash}`;
    auth.createUserWithEmailAndPassword(employee.email, employee.password)
      .then(user => {
        employee.id = user.uid;
        employee.teamId = this.currentUser.teamId;
        employee.photoURL = employeePhotoUrl;
        user.updateProfile({
          displayName: `{${employee.firstName} ${employee.lastName}}`,
          photoURL: employeePhotoUrl,
        })
      })
      .then(() => {
        db.ref(`test/users/${employee.id}`).set(employee);
      })
      .then(() => {
        this.isBusy = false;
        cb && cb();
      })
      .catch(err => {
        this.error = err.message;
        this.isBusy = false;
        console.log(err.message);
        cb && cb();
      })
  }
  createEmployeeAccount(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(stuff => {
        db.ref('test/users').orderByChild('email').equalTo(email)
          .once('value', (snapshot, error) => {
            if (error) {
              return console.log(error.message);
            }
            db.ref(`test/users/${Object.keys(snapshot.val())[0]}`).update({ uid: stuff.uid });
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  createSupervisorAccount(user, password, teamName) {
    auth.createUserWithEmailAndPassword(user.email, password)
      .then(stuff => {
        const teamId = db.ref('test/teams').push({ teamName }).key;
        const id = db.ref(`test/users`).push().key;
        db.ref(`test/users/${id}`).set({
          id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          role: user.role,
          teamId,
          uid: stuff.uid
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  addEmployee(user) {
    const id = db.ref(`test/users`).push().key;
    db.ref(`test/users/${id}`).set({
      id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      teamId: user.teamId,
      shift: user.shifts
    });
  }
  deleteEmployee(user) {
    const emp = db.ref(`test/users/${user.id}`)
    emp.remove();

  }
  editEmployee(id, newEmployeeValues) {
    db.ref(`test/users/${id}`).update(newEmployeeValues)
  }
  getEmployee(id) {
    let ref = db.ref(`test/users/${id}`)
    ref.once('value').then((snapshot) => {
      this.selectedEmployee = snapshot.val();
    });

  }
  logIn(email, password) {
    this.isBusy = true;
    auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.isBusy = false;
        this.loggedIn = false;
        this.email = '';
        console.log('Error', error.message);
      })
      .then(() => this.isOpenDialog = false);
  }
  logOut() {
    auth.signOut()
      .then(() => this.isOpenDialog = true)
      .catch(error => {
        console.log('Error', error.message);
      });
  }
  setShift(employee, yyyymmddDate, info) {
    db.ref(`test/users/${employee.id}/shifts/${yyyymmddDate}`).set(info);
  }
  setCoverage(yyyymmddDate, info) {
    db.ref(`test/teams/${this.currentUser.teamId}/coverage/${yyyymmddDate}`).set(info);
  }

  resetDb() {
    db.ref('test').set(null);
    const team1Id = db.ref(`test/teams`).push({ teamName: 'Loss Leaders' }).key;
    const team2Id = db.ref(`test/teams`).push({ teamName: 'Money Makers' }).key;
    const employees = [{
      "email": "lars@levine.com",
      "firstName": "Lars",
      "lastName": "Levine",
      "phone": "453",
      "role": "employee",
      teamId: team1Id
    }, {
      "email": "lana@linden.com",
      "firstName": "Lana",
      "lastName": "Linden",
      "phone": "89098",
      "role": "employee",
      teamId: team1Id
    }, {
      "email": "logan@lock.com",
      "firstName": "Logan",
      "lastName": "Lock",
      "phone": "20893",
      "role": "employee",
      teamId: team1Id
    }, {
      "email": "Laraine@Lilly.com",
      "firstName": "Laraine",
      "lastName": "Lilly",
      "phone": "",
      "role": "employee",
      teamId: team1Id
    }, {
      "email": "mary@meta.com",
      "firstName": "Mary",
      "lastName": "Meta",
      "phone": "1489098",
      "role": "employee",
      teamId: team2Id
    }, {
      "email": "morgan@matlock.com",
      "firstName": "Morgan",
      "lastName": "Matlock",
      "phone": "4520893",
      "role": "employee",
      teamId: team2Id
    }, {
      "email": "maureen@milly.com",
      "firstName": "Maureen",
      "lastName": "Milly",
      "phone": "543",
      "role": "employee",
      teamId: team2Id
    }];
    const supervisors = [{
      "email": "lisa@leslie.com",
      "firstName": "Lisa",
      "lastName": "Leslie",
      "phone": "7890",
      "role": "supervisor",
      teamId: team1Id
    }, {
      "email": "mark@measly.com",
      "firstName": "Mark",
      "lastName": "Measly",
      "phone": "547890",
      "role": "supervisor",
      teamId: team2Id
    }];
    employees.forEach(employee => {
      const ref = db.ref(`test/users`).push();
      employee.id = ref.key;
      ref.set(employee);
    });
    supervisors.forEach(supervisor => {
      const ref = db.ref(`test/users`).push();
      supervisor.id = ref.key;
      ref.set(supervisor);
    });
  }
}

const dataStore = new DataStore();
export { dataStore };