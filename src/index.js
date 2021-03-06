/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-montserrat';

ReactDOM.render((<Router><App /></Router>), document.getElementById('root'));
registerServiceWorker();
