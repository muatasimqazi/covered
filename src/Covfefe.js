import { app } from './base';
import { toJS, computed, observable } from 'mobx';

const auth = app.auth();
let db = app.database();

class Covfefe {
  @observable email = '';
  @observable isLoggedIn = false;
  @observable uid = '';
  @observable employeesObj = {};
  @observable supervisorsObj = {};
  @computed get currentUser() {
    console.log('get', this.isLoggedIn);
    // if (!this.isLoggedin) {
    //   return {};
    // }
    console.log('emps', toJS(this.employeesObj));
    for (let id in this.employeesObj) {
      console.log(id, this.employeesObj[id].email, this.email);
      if (this.employeesObj[id].email === this.email) {
        return this.employeesObj[id];
      }
    }
    console.log('supes', toJS(this.supervisorsObj));
    for (let id in this.supervisorsObj) {
      console.log(id, this.supervisorsObj[id].email, this.email);
      if (this.supervisorsObj[id].email === this.email) {
        return this.supervisorsObj[id];
      }
    }
    return {};
  }
  constructor() {
    // real-time listeners
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.isLoggedIn = true;
        this.email = firebaseUser.email;
        this.uid = firebaseUser.uid;
        console.log('email', this.email, this.isLoggedIn);
        db.ref('test/employees').on('value', (snapshot, error) => {
          if (error) {
            console.log('Error:', error);
            return;
          }
          console.log('empsObj', snapshot.val());
          this.employeesObj = observable(snapshot.val() || {});
        });
        db.ref('test/supervisors').on('value', (snapshot, error) => {
          if (error) {
            console.log('Error:', error);
            return;
          }
          console.log('supesObj' ,snapshot.val());
          this.supervisorsObj = observable(snapshot.val() || {});
        });
      }
      else {
        this.isLoggedIn = false;
        this.email = '';
      }
    });

  }
  logIn(email, password) {
    console.log('log in');
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.loggedIn = false;
      this.email = '';
      console.log('Error', error.message);
    });
  }
  logOut() {
    auth.signOut()
    .catch(error => {
      console.log('Error', error.message);
    });
  }
  resetDb() {
    db.ref('test').set(null);
    const team1Id = db.ref(`test/teams`).push({ teamName: 'Loss Leaders'}).key;
    const team2Id = db.ref(`test/teams`).push({ teamName: 'Money Makers'}).key;
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
      const ref = db.ref(`test/employees`).push();
      employee.id = ref.key;
      ref.set(employee);
    });
    supervisors.forEach(supervisor => {
      const ref = db.ref(`test/supervisors`).push();
      supervisor.id = ref.key;
      ref.set(supervisor);
    });
  }
}

const covfefe = new Covfefe();
export default covfefe;
