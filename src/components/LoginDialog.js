//@ts-check
import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Spinner from './Spinner';
import Snackbar from 'material-ui/Snackbar';
import { app } from '../base';

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      fbError: undefined,
      [e.target.name]: e.target.value
    });
  }

  handleSignUp() {
    this.setState({ loading: true });
    let email = this.state.email;
    let password = this.state.password;
    app.auth().createUserWithEmailAndPassword(email, password)
      .then(user => user.updateProfile({
        displayName: this.state.displayName
      }))
      .catch(err => this.setState({ fbError: err}))
      .then(() => this.setState({ loading: false}))

  }

  handleSignIn() {
    this.setState({ loading: true });
    let email = this.state.email;
    let password = this.state.password;
    app.auth().signInWithEmailAndPassword(email, password)
      .catch(err => this.setState({ fbError: err}))
      .then(() => this.setState({ loading: false}));
  }

  render() {
    const loading = this.state.loading;
    const openSnackbar = this.state.fbError ? true : false;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.props.onClose(null)}
      />,
      <FlatButton
        label="Login"
        primary={true}
        onClick={this.handleSignIn}
      />,

      <FlatButton
        label="Sign UP"
        primary={true}
        onClick={this.handleSignUp}
      />,
    ];
    return (
      <Dialog
        actions={actions}
        open={this.props.open}
        title='Log In'
      >
        {
          loading
            ?
            <Spinner size={80} style={{ top: 0 }} />
            :
            <div>
              <TextField
                hintText='Name'
                name='displayName'
                onChange={this.handleChange}
                value={this.state.displayName}
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
              {
                this.state.fbError
                  ?
                  <Snackbar
                    open={openSnackbar}
                    message={this.state.fbError.message}
                    autoHideDuration={4000}
                    style={{top: 0}}
                  />
                  :
                  undefined
              }

            </div>

        }
      </Dialog>
    );
  }
}

export default LoginDialog;