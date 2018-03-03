//@ts-check
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import FullRoster from './FullRoster';
import EmployeeEditForm from './EmployeeEditForm';
import { ROUTES } from '../../constants';
import AddNewEmployeeForm from './AddNewEmployee';

class Roster extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={ROUTES.roster} component={FullRoster} />
          <Route path={ROUTES.addEmployee} component={AddNewEmployeeForm} />
          <Route path={ROUTES.employeeEdit} component={EmployeeEditForm} />
        </Switch>
      </div>
    );
  }
};
export default withRouter(Roster);