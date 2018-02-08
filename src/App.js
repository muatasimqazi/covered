import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import Hero from './components/Hero';
import Features from './components/Features';
import SignUp from './components/SignUp.js';
import Employee from './components/Employee.js';
import Manager from './components/Manager.js';
import LoginDialog from './components/LoginDialog';
import Snackbar from 'material-ui/Snackbar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen800,
    accent1Color: amberA400,
    secondaryTextColor: '#000'
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      openLoginDialog: false,
      openSignupDialog: false,
      openSnackbar: false,
      snackbarMessage: '',
    }
  }
  handleLoginClick = (e) => {
    this.setState({
      openLoginDialog: true
    });
  }
  handleLogoutClick = () => {
    this.setState({
      loggedIn: false,
      openSnackbar: true,
      snackbarMessage: 'You have logged out',
    });
    this.props.history.push('/');
  }
  handleLoginClose = (loginInfo) => {
    this.setState({
      openLoginDialog: false
    });
    if (loginInfo) {
      // use loginInfo.email, loginInfo.password to log in
      this.setState({
        loggedIn: true,
        openSnackbar: true,
        snackbarMessage: 'Successfully logged in!',
      });
      console.log(loginInfo.email, loginInfo.email === 'm');
      if (loginInfo.email === 'm') {
        this.props.history.push('/manager');
      }
      else {
        this.props.history.push('/employee');
      }
    }
  }
  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false
    });
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBarTop 
            loggedIn={this.state.loggedIn}
            onLoginClick={this.handleLoginClick}
            onLogoutClick={this.handleLogoutClick}
          />
              <Switch>
                  <Route path="/signup" component={SignUp}/>
                  <Route path="/employee" component={Employee}/>
                  <Route path="/manager" component={Manager}/>
                  <Route path="/" component={Hero}/>
              </Switch>
          {/* <Hero />
          <Features /> */}
          <LoginDialog 
            onClose={this.handleLoginClose}
            open={this.state.openLoginDialog}
          />
          <Snackbar 
            autoHideDuration={3000}
            message={this.state.snackbarMessage}
            onRequestClose={this.handleSnackbarClose}
            open={this.state.openSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withRouter(App);


