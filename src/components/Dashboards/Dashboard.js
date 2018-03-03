//@ts-check
import React from 'react';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
import Supervisor from './Supervisor';
import Employee from './Employee';

@observer 
class Dashboard extends React.Component {

    render() {
        return (
            <div>
              {
                dataStore.currentUser ? (
                  dataStore.currentUser.role === 'supervisor' ? (
                    <Supervisor />
                  ) : (
                    <Employee />                      
                  )
                ) : (
                  <div>Loading...</div>
                )
              }
            </div>
        );
    }
}
export default Dashboard;