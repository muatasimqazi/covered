/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp.js';
import Employee from './components/Employee.js';
import Manager from './components/Manager.js';
import LoginDialog from './components/LoginDialog';
import Snackbar from 'material-ui/Snackbar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen800,
    accent1Color: '#ffa726',
    primaryTextColor: '#FFF',
    secondaryTextColor: '#000',
    accent1TextColor: '#000',
    alternateTextColor: '#FFF'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drawerOpen: false,
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

  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});


componentDidMount() {
  // simulates an async action, and hides the spinner
  setTimeout(() => this.setState({ loading: false }), 1000); // 1 sec
}

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBarTop 
            loggedIn={this.state.loggedIn}
            onLoginClick={this.handleLoginClick}
            onLogoutClick={this.handleLogoutClick}
            drawerOpen={this.state.drawerOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <Switch>
            <Route path="/signup" component={SignUp}/>
            <Route path="/employee" component={Employee}/>
            <Route path="/manager" component={Manager}/>
            <Route path="/" component={() => <HomePage authenticated={this.state.loggedIn} loading={this.state.loading}/>}/>
          </Switch>
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


