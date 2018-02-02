import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { app } from './base';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBarTop from './components/AppBarTop'

const App = () => (
  <MuiThemeProvider>
    <AppBarTop/>
  </MuiThemeProvider>
);

export default App;


