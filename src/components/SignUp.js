import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { app } from '../base';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      app.auth().createUserWithEmailAndPassword(info.email, info.password)
      .then(stuff => {
        console.log(stuff);
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
      email: '',
      password: '',
    });
  }
  render() {
    return (
      <div>
        <h1>Sign-Up Page</h1>
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