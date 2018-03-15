/* eslint-disable no-unused-vars */
//@ts-check
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green700, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import signIn from './components/SignIn';
import Employee from './components/Employee';
import Manager from './components/Manager';
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
    primary1Color: green700,
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
    }
  }

  handleDrawerToggle = () => dataStore.isLoggedIn && this.setState({ drawerOpen: !this.state.drawerOpen }); 
  handleDrawerOverlay = (open) => this.setState({ drawerOpen: open });
  
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
            onLeftIconButtonClick={this.handleDrawerToggle}
            handleDrawerToggle={this.handleDrawerToggle}
            drawerOpen={this.state.drawerOpen}
            handleDrawerOverlay={this.handleDrawerOverlay}
          />
          <Container fluid style={!dataStore.isLoggedIn ? { paddingLeft: 0, paddingRight: 0 } : undefined}>
            <Switch>
              <Route path={ROUTES.signUp} component={SignUp} />
              <Route path={ROUTES.signIn} component={signIn} />
              <Route path={ROUTES.blah} component={Blah} />
              <Route path={ROUTES.roster} component={Roster} />
              <Route path={ROUTES.shifts} component={ShiftManager} />
              <Route path={ROUTES.coverage} component={CoverageManager} />
              <Route exact path={ROUTES.home} component={HomePage} />
              <Redirect to={ROUTES.home} />
            </Switch>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withRouter(App);


