/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Employee from './components/Employee';
import Manager from './components/Manager';
import LoginDialog from './components/LoginDialog';
import Blah from './components/Blah';
import Snackbar from 'material-ui/Snackbar';
import { app } from './base';

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
      displayName: '',
      openLoginDialog: false,
      openSignupDialog: false,
      openSnackbar: false,
      snackbarMessage: '',
      currentUser: undefined,
      userRef: undefined,
      userSnap: undefined,
    }

    // this.handleLoginClose = this.handleLoginClose.bind(this)
  }
  handleLoginClick = (e) => {
    this.setState({
      openLoginDialog: true
    });
  }
  handleLogoutClick = () => {
    app.auth().signOut()
  }
  handleLoginClose = () => {
    this.setState({
      openLoginDialog: false,
    })
  }

  handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  componentDidMount() {
    // simulates an async action, and hides the spinner
    setTimeout(() => this.setState({ loading: false }), 1000); // 1 sec

    // real-time authentication listener
    this.authUnListen = app.auth().onAuthStateChanged(user => {
      if (user) {
        let userID = user.uid;
        let ref = app.database().ref(`${userID}/stores`);
        this.valueListener = ref.on('value', snapshot => this.setState({ userSnap: snapshot }))
        this.setState({ userRef: ref });

        this.setState({
          loggedIn: true,
          email: user.email,
          currentUser: user,
          displayName: user.displayName,
          openLoginDialog: false,
        });
      }
      else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  componentWillUnmount() {
    // stop listening for authentication state changes
    // and stop listening for value change events
    this.authUnListen();
    this.state.userRef.off('value', this.valueListener);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBarTop
            loggedIn={this.state.loggedIn}
            displayName={this.state.displayName}
            onLoginClick={this.handleLoginClick}
            onLogoutClick={this.handleLogoutClick}
            drawerOpen={this.state.drawerOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/employee" component={Employee} />
            <Route path="/manager" component={Manager} />
            <Route path="/blah" component={Blah} />
            <Route path="/" component={() => <HomePage authenticated={this.state.loggedIn} loading={this.state.loading} />} />
          </Switch>
          {
            !this.state.loggedIn
              ?
              <LoginDialog
                onClose={this.handleLoginClose}
                open={this.state.openLoginDialog}
              />
              :
              undefined
          }
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withRouter(App);


