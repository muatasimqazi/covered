import React from 'react';
import { covfefe } from '../Covfefe';
import { observer } from 'mobx-react';

@observer
class Blah extends React.Component {
  render() {
    return (
      <div>
        {covfefe.isLoggedIn ? <LoggedIn/> : <LoggedOut/>}
        {covfefe.isBusy &&
          <div style={{
            position: 'absolute',
            fontSize: '30pt',
            backgroundColor: 'yellow',
            width: '200px',
            height: '50px',
            marginLeft: '-100px',
            marginTop: '-25px',
            left: '50%',
            top: '50%',
            textAlign: 'center'
          }}>Working...</div>
        }
      </div>
    );
  }
}

@observer
class LoggedIn extends React.Component {
  handleClick = (e) => {
    if (e.target.name === 'resetdb') {
      covfefe.resetDb();
    }
    else if (e.target.name === 'logout') {
      covfefe.logOut();
    }
  }
  render() {
    if (covfefe.currentUser) {
      return (
        <div>
          <button name="resetdb" onClick={this.handleClick}>Reset DB</button>
          {covfefe.currentUser.role === 'employee' ? <LoggedInEmployee/> : <LoggedInSupervisor/>}
        </div>
      );
    }
    else {
      return (
        <div>
          <h1>You are not recognized as an employee</h1>
          <button name="logout" onClick={this.handleClick}>Log out</button>
        </div>
      )
    }
  }
}

@observer
class LoggedInEmployee extends React.Component {
  handleClick = (e) => {
    covfefe.logOut();
  }
  render() {
    return (
      <div>
        <h1>Employee {covfefe.currentUser.firstName} {covfefe.currentUser.lastName}</h1>
        <h2>{covfefe.currentTeamName}</h2>
        <button name="logout" onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}

@observer
class LoggedInSupervisor extends React.Component {
  handleClick = (e) => {
    covfefe.logOut();
  }
  render() {
    return (
      <div>
        <h1>Supervisor {covfefe.currentUser.firstName} {covfefe.currentUser.lastName}</h1>
        <h2>{covfefe.currentTeamName} Team Members:</h2>
        <ul>
          {covfefe.usersArray.map(user => 
            <li key={user.id}>{user.firstName} {user.lastName} ({user.role})</li>
          )}
        </ul>
        <button name="logout" onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}

@observer
class LoggedOut extends React.Component {
  render() {
    return (
      <div>
        <NewEmployee/>
        <NewSupervisor/>
        <ExistingEmployee/>
      </div>
    );
  }
}

@observer
class NewEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleChange = (e) => {
    this.setState({ [[e.target.name]]: e.target.value });
  }
  handleClick = (e) => {
    covfefe.createEmployeeAccount(this.state.email, this.state.password);
  }
  render() {
    return (
      <div>
        <h1>New Employee? Create Account Here</h1>
        <input name="email" onChange={this.handleChange} placeholder="Email" value={this.state.email}/>
        <input name="password" onChange={this.handleChange} type="password" placeholder="Password" value={this.state.password}/>
        <button name="ok" onClick={this.handleClick}>Create Employee Account</button>
      </div>
    );
  }
}

@observer
class NewSupervisor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      teamName: ''
    };
  }
  handleChange = (e) => {
    this.setState({ [[e.target.name]]: e.target.value });
  }
  handleClick = (e) => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      role: 'supervisor',
      email: this.state.email
    };
    covfefe.createSupervisorAccount(user, this.state.password, this.state.teamName);
  }
  render() {
    return (
      <div>
        <h1>New Supervisor? Create Account Here</h1>
        <input name="teamName" onChange={this.handleChange} placeholder="Team name" value={this.state.teamName}/>
        <input name="firstName" onChange={this.handleChange} placeholder="First name" value={this.state.firstName}/>
        <input name="lastName" onChange={this.handleChange} placeholder="Last name" value={this.state.lastName}/>
        <input name="phone" onChange={this.handleChange} placeholder="Phone" value={this.state.phone}/>
        <input name="email" onChange={this.handleChange} placeholder="Email" value={this.state.email}/>
        <input name="password" onChange={this.handleChange} type="password" placeholder="Password" value={this.state.password}/>
        <button name="ok" onClick={this.handleClick}>Create Supervisor Account</button>
      </div>
    );
  }
}

@observer
class ExistingEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
        <h1>Already Have An Account? Log In Here</h1>
        <input name="email" onChange={this.handleChange} placeholder="Email" value={this.state.email}/>
        <input name="password" onChange={this.handleChange} type="password" placeholder="Password" value={this.state.password}/>
        <button name="ok" onClick={this.handleClick}>Log In</button>
      </div>
    );
  }
}

export default Blah;