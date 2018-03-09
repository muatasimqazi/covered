/* eslint-disable */
import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import TeamRosterDropdown from './TeamRosterDropdown';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
/*

Known Issues
-- Shift information doesn't update after change (add visual success change)
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
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold'
  },
  successText: {
    marginTop: 10,
    color: 'rgb(89, 141, 28)',
    fontWeight: 'bold'
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

function formatShiftTime(date){
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if(hours < 10) {
    '0' + hours;
  } else if (minutes < 10) {
    '0' + minutes;
  }

  return `${hours}:${minutes}:00`;
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
    this.printCurrentShift = this.printCurrentShift.bind(this);
    this.rerenderMessages = this.rerenderMessages.bind(this);

    this.state = {
      requestAction: null,
      requestTimeStart: null,
      requestTimeEnd: null,
      errorText: null,
      successText: null,
      isError: false,
      isSuccess: false
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
      }
    });
  }

  handleSelection(evt) {
    this.setState({ requestAction: evt.target.value });
  }

  submitRequest() {
    let currUser = dataStore.currentUser.role === 'employee' ? dataStore.currentUser : dataStore.currUserViaSupervisor;
    if (dataStore.requestActions[0] === 'add') {
      if (!this.state.requestTimeStart || !this.state.requestTimeEnd) {
        this.setState({
          errorText: 'Please input shift start and shift end',
          successText: null,
          isError: true,
          isSuccess: false
        });          
      } else if (this.state.requestTimeStart > this.state.requestTimeEnd) {
        this.setState({
          errorText: 'Please correct shift entry - shift start must be earlier than shift end ',
          successText: null,
          isError: true,
          isSuccess: false
        });
        return;
      } else {
        dataStore.setShift(currUser, dataStore.formatTargetDate, {shiftStart: formatShiftTime(this.state.requestTimeStart), shiftEnd: formatShiftTime(this.state.requestTimeEnd)});
        this.setState({
          errorText: null,
          successText: 'Shift added!',
          isError: false,
          isSuccess: true
        });

      }
    } else if (dataStore.requestActions[0] === 'remove') {
        dataStore.setShift(currUser, dataStore.formatTargetDate, null);
        this.setState({
          errorText: null,
          successText: 'Shift removed!',
          isError: false,
          isSuccess: true
        });
    }
    this.rerenderMessages();
  }

  handleTimePickerStart(evt, date) {
    this.setState({requestTimeStart: date})
  }

  handleTimePickerEnd(evt, date) {
    this.setState({requestTimeEnd: date})
  }

  printCurrentShift() {

    if(dataStore.currentUser.role === 'employee') {
      if(!dataStore.currentUser.shifts) {
        return '';
      } else if (dataStore.currentUser.shifts[dataStore.formatTargetDate]){
       return formatTime(dataStore.currentUser.shifts[dataStore.formatTargetDate].shiftStart) + ' - ' + formatTime(dataStore.currentUser.shifts[dataStore.formatTargetDate].shiftEnd);
      } else {
        return 'Not scheduled';
      }
    } else if (dataStore.currUserViaSupervisor) {
      if(!dataStore.currUserViaSupervisor.shifts) {
        return '';
      } else if (dataStore.currUserViaSupervisor.shifts[dataStore.formatTargetDate]){
        return formatTime(dataStore.currUserViaSupervisor.shifts[dataStore.formatTargetDate].shiftStart) + ' - ' + formatTime(dataStore.currUserViaSupervisor.shifts[dataStore.formatTargetDate].shiftEnd);
      } else {
        return 'Not scheduled';
      }    
    } else {
      return '';
    }
  }

  componentWillMount() {
    if (dataStore.currentUser.role === 'supervisor') {
      if (!dataStore.currUserViaSupervisor) {
        dataStore.currUserViaSupervisor = dataStore.employeesArray[0];
      }
    }
    
  }

  rerenderMessages() {
    setInterval(function() {  
      this.setState({
        requestAction: dataStore.requestActions[0],
        isSuccess: false,
        isError: false
      });   
    }.bind(this), 2000);
  }


  render() {
    return (
      <div>
      {
        !dataStore.currentUser
        ? 
        <div>Loading...</div>
        :
        <div>
          <div>Date: { formatDate(dataStore.targetDate) }</div>
          {
            dataStore.currentUser.role === 'supervisor'
            ? <TeamRosterDropdown />
            : <div></div>
          }
          <div>Shift: { this.printCurrentShift() }</div>
          <div>
            <RadioButtonGroup name='request actions' valueSelected={dataStore.requestActions[0]}>
            {
              dataStore.requestActions.length > 0
              ? this.createActionOptions()
              : null
            }
            </RadioButtonGroup>
          </div>
          { 
            this.state.requestAction === 'add' || dataStore.requestActions[0] === 'add'
            ? <div>
                <TimePicker style={styles.timePicker} value={this.requestTimeStart} onChange={this.handleTimePickerStart} hintText="From"/>
                <TimePicker style={styles.timePicker} value={this.requestTimeEnd} onChange={this.handleTimePickerEnd} hintText="To"/>
              </div>
            : <div></div>
           }

          {
            this.state.isSuccess
            ? <div style={styles.successText}>{this.state.successText}</div>
            : null
          }

          <RaisedButton 
            label='Submit Changes'
            onClick={this.submitRequest}
            style={styles.submitButton}
          />
          {
            this.state.isError
            ? <div style={styles.errorText}>{this.state.errorText}</div>
            : null
          }
          
        </div> 
      }
      </div>
    );
  }
}

export default RequestForm;