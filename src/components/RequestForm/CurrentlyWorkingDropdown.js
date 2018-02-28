import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { dataStore } from '../../DataStore';


const styles = {
    dropDown: {
        margin: 0,
        padding: 0,
        width: 200
    }
}

class CurrentlyWorkingDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropDownVal3 = this.handleDropDownVal3.bind(this);
    this.createCurrWorkingList = this.createCurrWorkingList.bind(this);

    this.state = {
        dropDownVal3: 1
    }
  }

  handleDropDownVal3(event, index, value) {
    this.setState({ dropDownVal3: value });
  }

    createCurrWorkingList() {
        return dataStore.employeesWorking.map((employee, index) => 
            <MenuItem key={employee.uid} value={index + 1} primaryText={employee.firstName + ' ' + employee.lastName} />
        );
    }

  render() {

    return (
        <DropDownMenu
        value={this.state.dropDownVal3}
        onChange={this.handleDropDownVal3}
        style={styles.dropDown}
        autoWidth={false}
        >
            {this.createCurrWorkingList()}
        </DropDownMenu>
    );
  }
}


export default CurrentlyWorkingDropdown;