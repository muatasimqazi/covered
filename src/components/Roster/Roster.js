//@ts-check
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import FullRoster from './FullRoster';
import EmployeeEditForm from './EmployeeEditForm';
import { ROUTES } from '../../constants';

class Roster extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={ROUTES.roster} component={FullRoster} />
          <Route path="/roster/:id" component={EmployeeEditForm} />
        </Switch>
      </div>
    );
  }
};
export default withRouter(Roster);