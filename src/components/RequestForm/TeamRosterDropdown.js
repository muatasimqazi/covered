import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import firebase from 'firebase';


// TODO: Learn how to query the db to get roster
// function getTeamRoster() {
//     // TODO: team is hardcoded, query team value somewhere and reference
//     const teamRef = firebase.database().ref('teams/teamId0001/employees');

//     teamRef.on('value', function(snapshot) {
//         // console.log(snapshot.val());
//         for(let employee in snapshot.val()) {
//             console.log(employee);
//         }
//     });
// }

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

    this.state = {
        dropDownVal2: 1
    }
  }

  handleDropDownVal2(event, index, value) {
    this.setState({ dropDownVal2: value });
  }

  render() {

    return (
        <DropDownMenu
        value={this.state.dropDownVal2}
        onChange={this.handleDropDownVal2}
        style={styles.dropDown}
        autoWidth={false}
        >
            <MenuItem value={1} primaryText="List of Employees" />
        </DropDownMenu>
    );
  }
}


export default TeamRosterDropdown;