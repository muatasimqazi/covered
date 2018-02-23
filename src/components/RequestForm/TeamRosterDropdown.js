import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import firebase from 'firebase';
import { dataStore } from '../../DataStore';


const styles = {
    dropDown: {
        margin: 0,
        padding: 0,
        width: 200
    }
}

class TeamRosterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropDownVal2 = this.handleDropDownVal2.bind(this);
    this.createRosterList = this.createRosterList.bind(this);

    this.state = {
        dropDownVal2: 1
    }
  }

  handleDropDownVal2(event, index, value) {
    this.setState({ dropDownVal2: value });
  }

    createRosterList() {
        return dataStore.employeesArray.map((employee, index) => 
            <MenuItem key={employee.uid} value={index + 1} primaryText={employee.firstName + ' ' + employee.lastName} />
        );
    }

  render() {

    return (
        <DropDownMenu
        value={this.state.dropDownVal2}
        onChange={this.handleDropDownVal2}
        style={styles.dropDown}
        autoWidth={false}
        >
            {this.createRosterList()}
        </DropDownMenu>
    );
  }
}


export default TeamRosterDropdown;