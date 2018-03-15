/* eslint-disable */
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';


const styles = {
    dropDown: {
        margin: 0,
        padding: 0,
        width: 200
    }
}

@observer class TeamRosterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropDownVal = this.handleDropDownVal.bind(this);
    this.createRosterList = this.createRosterList.bind(this);

    this.state = {
        dropDownVal: 1
    }
  }

  handleDropDownVal(event, index, value) {
    dataStore.currUserViaSupIndex = value - 1;
    this.setState({ dropDownVal: value });
  }

    createRosterList() {
        return dataStore.employeesArray.map((employee, index) => 
            <MenuItem key={employee.id} value={index + 1} primaryText={employee.firstName + ' ' + employee.lastName} />
        );
    }

  render() {

    return (
        <DropDownMenu
        value={this.state.dropDownVal}
        onChange={this.handleDropDownVal}
        style={styles.dropDown}
        autoWidth={false}
        >
            {this.createRosterList()}
        </DropDownMenu>
    );
  }
}


export default TeamRosterDropdown;