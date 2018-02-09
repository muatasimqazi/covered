import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen800, amberA400 } from 'material-ui/styles/colors';
import RequestForm from './components/request-form/requestForm';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText} from 'material-ui/Card';

// input
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

// schedule
import data from './data.json';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryBar } from 'victory';
import {PropTypes} from 'prop-types';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen800,
    accent1Color: amberA400,
    secondaryTextColor: '#000'
  },
});

/* styles */
const btnStyle = {
  margin: 20
};

const instructionStyle = {
  marginTop: 20,
  fontSize: 18
};

const scheduleStyle = {
  marginTop: 20
};

const inputArea = {
  width: 100
}

const inputStyles = {
  margin: 40
}

/* test data */
const testDate = '1212018';
const testTeam = 'teamId0001';
const testEmployee = '0003';
let testHours = [];
let testChartData = [];

(function createDataset() {
  const team = data['teams'][testTeam]['employees'];
  const testHoursObj = data['teams'][testTeam]['hours'][testDate];
  testHours.push(testHoursObj.storeOpen);
  testHours.push(testHoursObj.storeClose);

  for(let i = 0; i < team.length; i++) {
    let workShiftObj = {
      employeeId: team[i]['id'],
      employeeName: team[i]['name'],
      isWorking: team[i]['shifts'][testDate]['working'],
      shiftStart: team[i]['shifts'][testDate]['shiftStart'],
      shiftEnd: team[i]['shifts'][testDate]['shiftEnd']

    };
    testChartData.push(workShiftObj)
  }
}());

/* HELPER FUNCTIONS */

class App extends Component {
  /* tomove: state for RequestForm */
  state = {
      open: false,
      startAMPM: 'AM',
      endAMPM: 'AM',
      from: '4:00',
      to: '6:00',
      action: 'remove'
  };

  handleOpen = () => {
      this.setState({open: true});
  };

  handleCancel = () => {
      this.setState({open: false});
  }

  handleSubmit = () => {
    this.handleCancel();
    //todo: send to method to add notification to data object
  }

  handleActionChoice = (evt) => {
    console.log(evt.target);
  }

  render() {
    // tomove: for RequestForm
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
            label="Request Changes"
            primary={true}
            onClick={this.handleSubmit}
          />
  ];
    
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <RaisedButton label="Februrary 12th, 2018" className="open-modal" style={btnStyle} onClick={this.handleOpen} />
      <Dialog
                title="Februrary 12th, 2018"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
            <div>
              <div style={instructionStyle}>Would you like to... </div>
              <RaisedButton label="Add Shift" dataset={'add'} style={btnStyle} />
              <RaisedButton label="Remove Shift" dataset={'remove'} style={btnStyle} />
              <RaisedButton label="Trade Shift" dataset={'trade'} style={btnStyle} disabled={true} />
            </div>
            <Card style={scheduleStyle}>
              <CardText> Chart will go here  </CardText>
            </Card>

            <div style={inputStyles}>
              From: <TextField style={inputArea} floatingLabelText="i.e. 1:00" />
              <DropDownMenu value={"this.state.startAMPM"} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="AM" />
                <MenuItem value={2} primaryText="PM" />
              </DropDownMenu>

              To: <TextField style={inputArea} floatingLabelText="i.e. 7:30" /> 
              <DropDownMenu value={this.state.endAMPM} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="AM" />
                <MenuItem value={2} primaryText="PM" />
              </DropDownMenu>
            </div>

            <div>
              { this.state.action ?
              `Confirm: You would like to ${this.state.action} a shift from ${this.state.from} to ${this.state.to}.` : '' }
            </div> 
      </Dialog>    
    </div>
  </MuiThemeProvider>
  );
  }
}

export default App;


