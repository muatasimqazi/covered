/* eslint-disable no-unused-vars */
//@ts-check
import React from 'react';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore'
import { Row, Col } from 'react-grid-system'
import Hero from './Hero';
import Features from './Features';
import Spinner from './Spinner';
import PaperCard from './PaperCard';
import TableCard from './TableCard';
import NotificationMessages from './NotificationMessages';
import Dashboard from './Dashboards/Dashboard';

@observer
class HomePage extends React.Component {
  render() {
    return (
      <div>
        {
          dataStore.isBusy
            ?
            <Spinner size={80} style={{ top: 200 }} />
            :
            dataStore.isLoggedIn
              ?
              <div>
                <Dashboard />
              </div>
              :
              <div>
                <Hero />
                <Features />
              </div>
        }
      </div>
    );
  }
}

export default HomePage;