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
      isSupervisor: false,
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
      const { firstName, lastName, phone, email, isSupervisor } = this.state;
      app.auth().createUserWithEmailAndPassword(info.email, info.password)
      .then(stuff => {
        return app.database().ref(`users/${stuff.uid}`).set({
          firstName,
          lastName,
          phone,
          email,
          isSupervisor,
          uid: stuff.uid
        })
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
      isSupervisor: true,
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
          value={this.state.isSupervisor}
          onChange={(event, index, value) => this.handleChange({target: {name: 'isSupervisor', value}})}
        >
          <MenuItem value={false} primaryText="Employee" />
          <MenuItem value={true} primaryText="Supervisor" />
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