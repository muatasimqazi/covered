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
     
    }

  }





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
          <AppBarTop/>
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
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withRouter(App);


