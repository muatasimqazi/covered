import { app } from './base';
import { observable } from 'mobx';

class Covfefe {
  @observable email = '';
  @observable isLoggedIn = false;
  @observable uid = '';
  constructor() {
    // real-time authentication listener
    app.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.isLoggedIn = true;
        this.email = firebaseUser.email;
        this.uid = firebaseUser.uid;
      }
      else {
        this.isLoggedIn = false;
        this.email = '';
      }
    });
  }
  LogIn(email, password) {
    console.log('log in');
    app.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.loggedIn = false;
      this.email = '';
      console.log('Error', error.message);
    });
  }
  LogOut() {
    app.auth().signOut()
    .catch(error => {
      console.log('Error', error.message);
    });
  }
}

export default new Covfefe();
