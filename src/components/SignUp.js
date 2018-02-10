import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
    if (info) {
      
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