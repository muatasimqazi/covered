import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { app } from '../base';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      role: "employee",
      email: '',
      password: '',
      phone: '',
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClick = (info) => {
    // info is either null or { email, password }
    if (info) {
      const { firstName, lastName, phone, email, role } = this.state;
      app.auth().createUserWithEmailAndPassword(info.email, info.password)
      .then(stuff => {
        const teamId = 'teamId0001';
        if (role === 'supervisor') {
          return app.database().ref(`teams/${teamId}/supervisors/${stuff.uid}`).set({
            firstName,
            lastName,
            phone,
            email,
            role,
            uid: stuff.uid
          });
        }
        else {
          const shifts = {};
          for (let i = 0; i < 14; ++i) {
            const d = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
            const yyyy = d.getFullYear().toString();
            let mm = (d.getMonth() + 1).toString();
            if (mm.length === 1) {
              mm = '0' + mm;
            }
            let dd = d.getDate().toString();
            if (dd.length === 1) {
              dd = '0' + dd;
            }
            shifts[yyyy + mm + dd] = Math.random() < 0.50 ?
              { "working": false, "shiftStart": null, "shiftEnd": null } :
              { "working": true, "shiftStart": "08:00:00", "shiftEnd": "17:00:00"}
          }
          return app.database().ref(`teams/${teamId}/employees/${stuff.uid}`).set({
            firstName,
            lastName,
            phone,
            email,
            role,
            shifts,
            uid: stuff.uid
          });
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log('Error:', error.code, error.message);
      });
    }
    else {
      this.props.history.push('/');
    }
    this.setState({
      firstName: '',
      lastName: '',
      role: "employee",
      email: '',
      password: '',
      phone: '',
    });
  }
  render() {
    return (
      <div>
        <h1>Sign-Up Page</h1>
        <TextField
          hintText='First name'
          name='firstName'
          onChange={this.handleChange}
          value={this.state.firstName}
        />
        <br />
        <TextField
          hintText='Last name'
          name='lastName'
          onChange={this.handleChange}
          value={this.state.lastName}
        />
        <br />
        <SelectField
          // floatingLabelText="Frequency"
          value={this.state.role}
          onChange={(event, index, value) => this.handleChange({target: {name: 'role', value}})}
        >
          <MenuItem value="employee" primaryText="Employee" />
          <MenuItem value="supervisor" primaryText="Supervisor" />
        </SelectField>
        <br />
        <TextField
          hintText='Phone'
          name='phone'
          onChange={this.handleChange}
          value={this.state.phone}
        />
        <br />
        <TextField
          hintText='Email'
          name='email'
          onChange={this.handleChange}
          value={this.state.email}
        />
        <br />
        <TextField
          hintText='Password'
          name='password'
          onChange={this.handleChange}
          type='password'
          value={this.state.password}
        />
        <br />
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={() => this.handleClick(null)}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onClick={() => this.handleClick(this.state)}
        />,
      </div>
    );
  }
}

export default SignUp;