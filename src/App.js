/* eslint-disable no-unused-vars */
//@ts-check
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import signIn from './components/SignIn';
import Employee from './components/Employee';
import Manager from './components/Manager';
import LoginDialog from './components/LoginDialog';
import Blah from './components/Blah';
import Snackbar from 'material-ui/Snackbar';
import { app } from './base';
import { ROUTES } from './constants';
import Roster from './components/Roster/Roster';
import ShiftManager from './components/ShiftManager/ShiftManager';
import CoverageManager from './components/CoverageManager/CoverageManager';
import { dataStore } from './DataStore';
import { observer } from 'mobx-react';
import { Container } from 'react-grid-system';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen800,
    accent1Color: '#ffa726',
    primaryTextColor: '#FFF',
    secondaryTextColor: '#000',
    accent1TextColor: '#000',
    alternateTextColor: '#FFF',
  }
});
  
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      openLoginDialog: false,
    }

  }
  handleLoginClick = (e) => {
    this.props.history.push(ROUTES.signIn);
  }
  handleLogoutClick = () => {
    dataStore.logOut();
    this.setState({
      openLoginDialog: false,
    });
    this.props.history.push('/');
  }
  handleLoginClose = () => {
    this.setState({
      openLoginDialog: false,
    })
  }

  handleDrawerToggle = () => dataStore.isLoggedIn && this.setState({ drawerOpen: !this.state.drawerOpen });
  handleDrawerOverlay = (open) => this.setState({ drawerOpen: open });

  componentDidMount() {
    // simulates an async action, and hides the spinner
    setTimeout(() => this.setState({ loading: false }), 1000); // 1 sec
  }

  render() {
    const contentStyle = { transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

    if (this.state.drawerOpen) {
      contentStyle.marginLeft = 256;
    }

    const openLoginDialog = this.state.openLoginDialog && dataStore.isOpenDialog;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={contentStyle}>
          <AppBarTop
            loggedIn={dataStore.isLoggedIn}
            displayName={this.state.displayName}
            onLoginClick={this.handleLoginClick}
            onLogoutClick={this.handleLogoutClick}
            onLeftIconButtonClick={this.handleDrawerToggle}
            handleDrawerToggle={this.handleDrawerToggle}
            drawerOpen={this.state.drawerOpen}
            handleDrawerOverlay={this.handleDrawerOverlay}
          />
          <Container fluid style={!dataStore.isLoggedIn ? { paddingLeft: 0, paddingRight: 0 } : undefined}>

            <Switch>
              <Route path={ROUTES.signUp} component={SignUp} />
              <Route path={ROUTES.signIn} component={signIn} />
              <Route path={ROUTES.employee} component={Employee} />
              <Route path={ROUTES.manager} component={Manager} />
              <Route path={ROUTES.blah} component={Blah} />
              <Route path="/roster" component={Roster} />
              <Route path={ROUTES.shifts} component={ShiftManager} />
              <Route path={ROUTES.coverage} component={CoverageManager} />
              
              <Route exact path="/" component={() => <HomePage authenticated={this.state.loggedIn} />} />
              <Redirect to="/" />
            </Switch>


            {
              openLoginDialog
                ?
                <LoginDialog
                  onClose={this.handleLoginClose}
                  open={openLoginDialog}
                />
                :
                undefined
            }
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withRouter(App);


