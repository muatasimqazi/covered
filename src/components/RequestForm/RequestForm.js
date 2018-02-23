/* eslint-disable */
import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TeamRosterDropdown from './TeamRosterDropdown';
import firebase from 'firebase';
import {observer} from 'mobx-react';
import { dataStore } from '../../DataStore';

const styles = {
  mainRadioButton: {
    margin: 10
  },
  submitButton: {
    marginTop: 35,
    marginLeft: 0
  },
  timePicker: {
    width: 10
  },
  dropDown: {
    margin: 0,
    padding: 0,
    width: 200
  }
};

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();

  if(day < 10) {
    day = day;
  }

  if(month < 10) {
    month = month;
  }

  return `${month}/${day}/${year}`;
}

@observer class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.handleDropDownVal = this.handleDropDownVal.bind(this);

    this.state = {
      requestAction: 'add',
      userRole: 'supervisor',
      dropDownVal: 1
    }
  }

  handleDropDownVal(event, index, value) {
    this.setState({ dropDownVal: value });
  }


  handleSelection(evt) {
    this.setState({ requestAction: evt.target.value });
    console.log(dataStore.employeesArray);
  }

  submitChanges() {
    // do data validation
    // if not valid, respond with an error
    // if valid, respond with success
    // send request to firebase notifications object

    console.log('submit changes');
  }

  render() {
    const isSupervisor = this.state.userRole === 'supervisor';
    let teamRoster;
    if (isSupervisor) {
      teamRoster = <TeamRosterDropdown />;
    }

    // changes input type based on current radio selection
    const whichAction = this.state.requestAction;
    let actionInput = null;
      if(whichAction === 'add' || whichAction === 'remove') {
        actionInput = 
        <div>
          <TimePicker style={styles.timePicker} hintText="From"/>
          <TimePicker style={styles.timePicker} hintText="To"/>
        </div>;
      } else if (whichAction === 'trade') {
        actionInput = 
        <div>
          <DropDownMenu
          value={this.state.dropDownVal}
          onChange={this.handleDropDownVal}
          style={styles.dropDown}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="List of currently working" />
        </DropDownMenu>

      </div>;
      } else {
        actionInput = <div></div>
      }

    return (
    <div>
      <div>Date: {formatDate(dataStore.targetDate)}</div>
      {teamRoster}
      <div>
      <RadioButtonGroup name="requestTypes" defaultSelected="add">
        <RadioButton
          value="add"
          label="Add Shift"
          style={styles.mainRadioButton}
          onClick={this.handleSelection}
        />
        <RadioButton
          value="remove"
          label="Remove Shift"
          style={styles.mainRadioButton}
          onClick={this.handleSelection}
        />
        <RadioButton
          value="trade"
          label="Trade Shift"
          style={styles.mainRadioButton}
          onClick={this.handleSelection}
        />
      </RadioButtonGroup>
      </div>
        {actionInput}

        <RaisedButton 
          label="Submit Changes"
          onClick={this.submitChanges}
          style={styles.submitButton}
        />
    </div>
    );
  }
}


export default RequestForm;