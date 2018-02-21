import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        email: '',
        password: ''
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.props.onClose(null)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={() => this.props.onClose(this.state)}
      />,
    ];
    return (
      <Dialog 
        actions={actions} 
        open={this.props.open}
        title='Log In'
      >
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
      </Dialog>
    );
  }
}

export default LoginDialog;