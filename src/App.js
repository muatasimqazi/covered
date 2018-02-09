import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import AppBarTop from './components/AppBarTop';
import Hero from './components/Hero';
import Features from './components/Features';
import logo from './logo.svg';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen800,
    accent1Color: amberA400,
    secondaryTextColor: '#000'
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBarTop />
      <Hero />
      <Features />
    </div>
  </MuiThemeProvider>
);

export default App;


