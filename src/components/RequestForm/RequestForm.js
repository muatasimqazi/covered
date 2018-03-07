/* eslint-disable */
import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import TeamRosterDropdown from './TeamRosterDropdown';
import CurrentlyWorkingDropdown from './CurrentlyWorkingDropdown';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
/*

Known Issues
-- Radio Button Coloring (issue related to RadioButtonGroup)
-- Shift information doesn't update after change (add visual success change)
-- Trade will not work without access to the second drop down (the person whose shift is being traded)

*/


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
  },
  radioButtonChecked: {
    color: '#F44336'
  },
  radioButtonUnChecked: {
    color: 'white'
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

function formatTime(timeEntry) {
  let entryArr = timeEntry.split(":");
  // format hour as number in order to use comparison operators
  entryArr[0] = +entryArr[0];

  if (entryArr[0] === 0) {
    return `${12}:${entryArr[1]}am`;
  } else if(entryArr[0] <= 11) {
    return `${entryArr[0]}:${entryArr[1]}am`;
  } else if (entryArr[0] === 12) {
    return `${entryArr[0]}:${entryArr[1]}pm`
  } else {
    return `${entryArr[0] - 12}:${entryArr[1]}pm`;
  }
  
}

@observer class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.createActionOptions = this.createActionOptions.bind(this);
    this.handleTimePickerStart = this.handleTimePickerStart.bind(this);
    this.handleTimePickerEnd = this.handleTimePickerEnd.bind(this);

    this.state = {
      requestAction: null,
      requestTimeStart: null,
      requestTimeEnd: null
    }
  }

  createActionOptions() {
    return dataStore.requestActions.map( (entry, index) => {
      if (entry === 'add') {
        return <RadioButton 
          key={index}
          value="add"
          label="Add Shift"
          style={styles.mainRadioButton}
          onClick={this.handleSelection}
        />
      } else if (entry === 'remove') {
        return <RadioButton
          key={index}
          value="remove"
          label="Remove Shift"
          style={styles.mainRadioButton}
          onClick={this.handleSelection}
        />
      } else {
        return <RadioButton
          key={index}
          value="trade"
          label="Trade Shift"
          style={styles.mainRadioButton}
          onClick={this.handleSelection}
      />
      }
    });
  }

  handleSelection(evt) {
    this.setState({ requestAction: evt.target.value });
  }

  submitRequest() {
    let currUser = dataStore.currentUser.role === 'employee' ? dataStore.currentUser : dataStore.currUserViaSupervisor;

    if (this.state.requestAction === 'add') {
      if(this.state.requestTimeStart > this.state.requestTimeEnd) {
        console.log('error');
        return;
      } else {
        dataStore.setShift(currUser, dataStore.formatTargetDate, {shiftStart: this.formatShiftTime(this.state.requestTimeStart), shiftEnd: this.formatShiftTime(this.state.requestTimeEnd)});
      }
    } else if (this.state.requestAction === 'remove') {
        dataStore.setShift(currUser, dataStore.formatTargetDate, null)
    } else if (this.state.requestAction === 'trade') {
      console.log('Sara needs to capture the second drop down value in order to process this request.')
    }
  }

  handleTimePickerStart(evt, date) {
    this.setState({requestTimeStart: date})
  }

  handleTimePickerEnd(evt, date) {
    this.setState({requestTimeEnd: date})
  }

  formatShiftTime(date){
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(hours < 10) {
      '0' + hours;
    } else if (minutes < 10) {
      '0' + minutes;
    }

    return `${hours}:${minutes}:00`;
  }

  componentWillMount() {
    if (dataStore.currentUser.role === 'supervisor') {
      if (!dataStore.currUserViaSupervisor) {
        dataStore.currUserViaSupervisor = dataStore.employeesArray[0];
      }
    }
  }


  render() {

    /* CONDITIONAL RENDERING */
    // Team Roster - if supervisor is logged in, list their team 
    const isSupervisor = true;
    let teamRoster = null;
    if (isSupervisor) {
      teamRoster = <TeamRosterDropdown />;
    }

    // Current Shift - based on user or targeted user (if supervisor logged in)
    let currShift = null;
    if(dataStore.currentUser.role === 'employee') {
      if (dataStore.currentUser.shifts[dataStore.formatTargetDate]){
        currShift = formatTime(dataStore.currentUser.shifts[dataStore.formatTargetDate].shiftStart) + ' - ' + formatTime(dataStore.currentUser.shifts[dataStore.formatTargetDate].shiftEnd);
      } else {
        currShift = 'Not scheduled';
      }
    } else if (dataStore.currUserViaSupervisor) {
      if (dataStore.currUserViaSupervisor.shifts[dataStore.formatTargetDate]){
        currShift = formatTime(dataStore.currUserViaSupervisor.shifts[dataStore.formatTargetDate].shiftStart) + ' - ' + formatTime(dataStore.currUserViaSupervisor.shifts[dataStore.formatTargetDate].shiftEnd);
      } else {
        currShift = 'Not scheduled';
      }    
    } else {
      currShift = '';
    }

    return (
      <div>
      {
        !dataStore.currentUser
        ? 
        <div>Loading...</div>
        :
        <div>
          <div>Date: { formatDate(dataStore.targetDate) }</div>
          {teamRoster}
          <div>Shift: { currShift}</div>
          <div>
            { this.createActionOptions() }
          </div>
          { 
            dataStore.requestActions[0] === 'add'
            ? <div>
                <TimePicker style={styles.timePicker} value={this.requestTimeStart} onChange={this.handleTimePickerStart} hintText="From"/>
                <TimePicker style={styles.timePicker} value={this.requestTimeEnd} onChange={this.handleTimePickerEnd} hintText="To"/>
              </div>
            : <div></div>
           }

          { 
            dataStore.requestActions[1] === 'trade'
            ? <div>
                <CurrentlyWorkingDropdown  />
              </div>
            : <div></div>
           }

          <RaisedButton 
            label="Submit Changes"
            onClick={this.submitRequest}
            style={styles.submitButton}
          />
        </div> 
      }
      </div>
    );
  }
}

export default RequestForm;