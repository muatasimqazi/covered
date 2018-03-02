/* eslint-disable */
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
        let currWorkingList = dataStore.employeesWorking.filter( employee => 
            employee.id !== dataStore.currentUser.id
        );

        return currWorkingList.map((employee, index) => {
            if (employee.id !== dataStore.currentUser.id)
                return <MenuItem key={employee.id} value={index + 1} primaryText={employee.firstName + ' ' + employee.lastName} />
        });
    }

  render() {

    return (
        <DropDownMenu
        value={this.state.dropDownVal3}
        onChange={this.handleDropDownVal3}
        style={styles.dropDown}
        autoWidth={false}
        >
            {console.log(dataStore.employeesWorking)}

            {   dataStore.employeesWorking.length === 0 || (dataStore.employeesWorking.length === 1 && dataStore.employeesWorking[0].id === dataStore.currentUser.id)
                ? <MenuItem value={1} primaryText={'No workers available'} />
                : this.createCurrWorkingList()
            }
        </DropDownMenu>
    );
  }
}


export default CurrentlyWorkingDropdown;