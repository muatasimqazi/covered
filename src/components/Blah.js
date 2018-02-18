import React from 'react';
import covfefe from '../Covfefe';
import { observer } from 'mobx-react';

@observer
class Blah extends React.Component {
  render() {
    return (
      <div>
        {/* {covfefe.email} */}
        {covfefe.isLoggedIn? <LoggedIn/> : <LoggedOut/>}
      </div>
    );
  }
}

@observer
class LoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'lars@levine.com',
      password: 'covered'
    };
  }
  handleChange = (e) => {
    this.setState({ [[e.target.name]]: e.target.value });
  }
  handleClick = (e) => {
    covfefe.logIn(this.state.email, this.state.password);
  }
  render() {
    return (
      <div>
        <input name="email" onChange={this.handleChange} value={this.state.email}/>
        <input name="password" onChange={this.handleChange} type="password" value={this.state.password}/>
        <button name="ok" onClick={this.handleClick}>OK</button>
      </div>
    );
  }
}

@observer
class LoggedIn extends React.Component {
  handleClick = (e) => {
    if (e.target.name === 'logout') {
      covfefe.logOut();
    }
    else if (e.target.name === 'resetdb') {
      covfefe.resetDb();
    }
  }
  render() {
    return (
      <div>
        <ul>
          <li>First name: {covfefe.currentUser.firstName}</li>
          <li>Last name: {covfefe.currentUser.lastName}</li>
          <li>Email: {covfefe.currentUser.email}</li>
          <li>ID: {covfefe.currentUser.id}</li>
          <li>Role: {covfefe.currentUser.role}</li>
          <li>Team: {covfefe.currentUser.teamId}</li>
          <li>{covfefe.isLoggedIn.toString()}</li>
        </ul>
        <button name="logout" onClick={this.handleClick}>Log out</button>
        <button name="resetdb" onClick={this.handleClick}>Reset DB</button>
      </div>
    );
  }
}

export default Blah;