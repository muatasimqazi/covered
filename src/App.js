import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import Hero from './components/Hero';
import Features from './components/Features';
import LoginDialog from './components/LoginDialog';

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
      openLoginDialog: false,
      openSignupDialog: false,
    }
  }
  handleLoginClick = (e) => {
    this.setState({
      openLoginDialog: true
    });
  }
  handleLoginClose = (loginInfo) => {
    this.setState({
      openLoginDialog: false
    });
    if (loginInfo) {
      console.log(loginInfo.email, loginInfo.password);
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBarTop onLoginClick={this.handleLoginClick}/>
          <Hero />
          <Features />
          <LoginDialog 
            onClose={this.handleLoginClose}
            open={this.state.openLoginDialog}
          />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;


