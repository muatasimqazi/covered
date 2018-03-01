//@ts-check
import React from 'react';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
import Supervisor from './Supervisor';
import Employee from './Employee';

@observer 
class Dashboard extends React.Component {

    render() {
        const isSupervisor = dataStore.currentUser.role === 'supervisor';
        return (
            <div>
            {
                isSupervisor
                  ?
                  <Supervisor />
                  :
                  <Employee />
              }
              </div>
        );
    }
}
export default Dashboard;