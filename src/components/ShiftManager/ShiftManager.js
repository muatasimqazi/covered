/* eslint-disable */
import React from 'react';
import PaperCard from './../PaperCard';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Row, Col, Hidden } from 'react-grid-system';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';


const styles = {
    weekButton: {
        marginTop: 10,
        marginRight: 5,
        marginBottom: 5
    },
    weekDefinition: {
        marginTop: 15,
        marginLeft: -25,
        fontFamily: 'Montserrat'
    },
    shiftDefinition: {
        marginTop: 25,
        marginLeft: 20,
        fontFamily: 'Montserrat'
    },
    shiftInput: {
        marginTop: -12,
        marginLeft: 0,
        marginRight: 0
    },
    timeOfDayDropdown: {
        marginTop: 4,
        marginLeft: -25,
        marginRight: -45
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
        marginBottom: 28
    },
    shiftArea: {
        marginTop: -10
    },
    shiftTableHeader: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    shiftTableHeaderArea: {
        marginTop: -100
    },
    tableEmployee: {
        width: 170, 
        align: 'center'
    },
    shiftCell: {
        paddingTop: 10,
        paddingBottom: 10,
        cursor: 'pointer'
    },
    shiftCellPast: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#e5e5e5'
    }

};

function formatDate(date) {
    // todo: consider making more human friendly - i.e. March 24th, 2018
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
  
    if(day < 10) day = day;
    if(month < 10) month = month;
  
    return `${month}/${day}/${year}`;
}

function formatTime(timeEntry) {

    if(!timeEntry || !validShiftString(timeEntry)) {
        return 'invalid'
    }

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
    return timeEntry;
    
  }

function validShiftString(entry) {
    let entryArr = entry.split(':');
    let validNumbers = entryArr.filter((item) =>
        !isNaN(item)
    );

    return validNumbers.length === 3 ? true : false;
}

function toDateProperty(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${year}${month}${day}`;
}

function formatAs24Hr(time, isPM) {
    let timeArr = time.split(':');
    let hours = timeArr[0];
    let minutes = timeArr[1];

    if(isPM === 2) hours = +hours + 12;

    if(hours < 10) {
        '0' + hours;
    } else if (minutes < 10) {
        '0' + minutes;
    }

    return `${hours}:${minutes}:00`;
}

function isDateAfterToday(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (date >= today) {
        return true;
    }

    return false;
}

function isTimeValid(start, end, startTimeOfDay, endTimeOfDay) {
    console.log(start, end);
    // todo: we can easily split this into multiple small fns
    if(!start || !end) return;

    let startArr = start.split(':');
    let endArr = end.split(':');


    // convert into 24 hour numbers
    if (startTimeOfDay === 2) startArr[0] = +startArr[0] + 12;
    if (endTimeOfDay === 2) endArr[0] = +endArr[0] + 12;

    if (isNaN(startArr.reduce((prev, next) => prev + next)) || isNaN(endArr.reduce((prev, next) => prev + next))) {
        return false;
    } else if (+startArr[0] < 0 || +startArr[0] > 24 || +endArr[0] < 0 || +endArr[0] > 24 || +startArr[1] > 59 || +startArr[1] < 0 || +endArr[1] > 59 || +endArr[1] < 0) { 
        return false;
    } else if (+startArr[0] === +endArr[0]) {
        if(+startArr[1] > +endArr[1]) {
            return false;
        } else {
            return true;
        }
    } else if (+startArr[0] > +endArr[0]) {
        return false;
    }

    return true;
}


@observer export default class ShiftManager extends React.Component {
    constructor(props) {
        super(props);
        this.handleStartShiftDropdown = this.handleStartShiftDropdown.bind(this);
        this.handleEndShiftDropdown = this.handleEndShiftDropdown.bind(this);
        this.handlePrevWeekClick = this.handlePrevWeekClick.bind(this);
        this.handleNextWeekClick = this.handleNextWeekClick.bind(this);
        this.handleShiftStartInput = this.handleShiftStartInput.bind(this);
        this.handleShiftEndInput = this.handleShiftEndInput.bind(this);
        this.handleShiftToggle = this.handleShiftToggle.bind(this);
        
        const now = new Date();

        this.state = {
            startShiftDropdown: 1,
            endShiftDropdown: 2,
            startOfWeek: new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()),
            shiftStartTime: null,
            shiftEndTime: null,
            errorText: null
        }
    }

    // todo: collapse this fn with handleNextWeekClick if you can find a way to query label name
    handlePrevWeekClick() {
        const week = -7;
        let newStart = new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + week);
        this.setState({ startOfWeek: newStart });   
    }
    
    handleNextWeekClick() {
        const week = 7;
        let newStart = new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + week);
        this.setState({ startOfWeek: newStart });
    }

    handleStartShiftDropdown(evt, index, value) {
        this.setState({startShiftDropdown: value})
    }

    handleEndShiftDropdown(evt, index, value) {
        this.setState({endShiftDropdown: value})
    }

    handleShiftStartInput(evt, value) {
        this.setState({shiftStartTime: value})
    }

    handleShiftEndInput(evt, value) {
        this.setState({shiftEndTime: value})

    }

    handleShiftToggle(userIndex, dateIndex, evt) {
        // do data validation for shiftStartTime and shiftEndTime
        // send off to shift set fn
        let weekDatesArr = [this.state.startOfWeek, new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 1), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 2), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 3), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 4), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 5), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 6)];
        
        if(userIndex === 0 && dateIndex === 0) {
            return;
        } 


        if (!isDateAfterToday(weekDatesArr[dateIndex - 1])){
            let today = new Date();
            this.setState({errorText: `Selected shifts must be after today, ${formatDate(today)}` });
            return;
        }

        if (!dataStore.employeesArray[userIndex].shifts || !dataStore.employeesArray[userIndex].shifts[toDateProperty(weekDatesArr[dateIndex - 1])]) {
            if (!isTimeValid(this.state.shiftStartTime, this.state.shiftEndTime, this.state.startShiftDropdown, this.state.endShiftDropdown)){
                this.setState({errorText: `Shifts need to be in the format - hh:mm`});
            } else {
                this.setState({errorText: null});
                dataStore.setShift(dataStore.employeesArray[userIndex], toDateProperty(weekDatesArr[dateIndex -1]), {shiftStart: formatAs24Hr(this.state.shiftStartTime, this.state.startShiftDropdown), shiftEnd: formatAs24Hr(this.state.shiftEndTime, this.state.endShiftDropdown)});
            }
        } else if (dataStore.employeesArray[userIndex].shifts[toDateProperty(weekDatesArr[dateIndex - 1])]){
            dataStore.setShift(dataStore.employeesArray[userIndex], toDateProperty(weekDatesArr[dateIndex - 1]), null);
        }
    }

    render() {

        let weekDatesArr = [this.state.startOfWeek, new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 1), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 2), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 3), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 4), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 5), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 6)]
        let employeeRows = dataStore.employeesArray.map((employee, index) => {
            return employee.shifts 
            ? <TableRow
                key={index}>
                <TableRowColumn style={styles.tableEmployee}>{employee.firstName} {employee.lastName}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[0]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[0])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[0])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[0])].shiftEnd)} ` : '---'}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[1]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[1])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[1])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[1])].shiftEnd)} ` : '---'}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[2]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[2])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[2])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[2])].shiftEnd)} ` : '---'}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[3]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[3])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[3])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[3])].shiftEnd)} ` : '---'}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[4]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[4])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[4])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[4])].shiftEnd)} ` : '---'}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[5]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[5])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[5])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[5])].shiftEnd)} ` : '---'}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[6]) ? styles.shiftCell: styles.shiftCellPast}>{employee.shifts[toDateProperty(weekDatesArr[6])] ? `${formatTime(employee.shifts[toDateProperty(weekDatesArr[6])].shiftStart)} - ${formatTime(employee.shifts[toDateProperty(weekDatesArr[6])].shiftEnd)} ` : '---'}</TableRowColumn>
            </TableRow>
            : <TableRow
                key={index}>
                <TableRowColumn style={styles.tableEmployee}>{employee.firstName} {employee.lastName}</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[0]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>
                <TableRowColumn style={isDateAfterToday(weekDatesArr[1]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>                
                <TableRowColumn style={isDateAfterToday(weekDatesArr[2]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>                
                <TableRowColumn style={isDateAfterToday(weekDatesArr[3]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>                
                <TableRowColumn style={isDateAfterToday(weekDatesArr[4]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>                
                <TableRowColumn style={isDateAfterToday(weekDatesArr[5]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>                
                <TableRowColumn style={isDateAfterToday(weekDatesArr[6]) ? styles.shiftCell: styles.shiftCellPast}>---</TableRowColumn>            
            </TableRow>
        });


        return (
            <div>
                <Row>
                    {/* Title Area */}
                    <Col sm={12}>
                        <PaperCard
                            style={styles.titleCard}
                            slug="Quick add shifts"
                            title="Shift Manager"
                        >
                        {/* Week Selector */}
                        <Row>
                            <Col sm={3}>
                            <RaisedButton
                                style={styles.weekButton}
                                label="Prev"
                                value="prev"
                                onClick={this.handlePrevWeekClick}
                            />
                            <RaisedButton
                                style={styles.weekButton}
                                label="Next"
                                value="next"
                                onClick={this.handleNextWeekClick}
                            />
                            </Col>
                            <div style={styles.weekDefinition}> Week of {formatDate(this.state.startOfWeek)}</div>
                        </Row>
                        {/* Shift Definition Area */}
                        <Row style={styles.shiftArea}>
                        <div style={styles.shiftDefinition}>Define shift:</div>
                            <Col>
                                <TextField
                                    style={styles.shiftInput}
                                    floatingLabelText="Shift start - 08:00"
                                    onChange={this.handleShiftStartInput}
                                />
                            </Col>
                            <Col>
                                <DropDownMenu
                                    style={styles.timeOfDayDropdown}
                                    value={this.state.startShiftDropdown} 
                                    onChange={this.handleStartShiftDropdown}
                                >
                                    <MenuItem value={1} primaryText="AM" />
                                    <MenuItem value={2} primaryText="PM" />
                                </DropDownMenu>
                            </Col>
                            <Col>
                                <TextField
                                    style={styles.shiftInput}
                                    floatingLabelText="Shift end - 05:00"
                                    onChange={this.handleShiftEndInput}
                                />
                            </Col>
                            <Col>
                                <DropDownMenu
                                    style={styles.timeOfDayDropdown}
                                    value={this.state.endShiftDropdown} 
                                    onChange={this.handleEndShiftDropdown}
                                >
                                    <MenuItem value={1} primaryText="AM" />
                                    <MenuItem value={2} primaryText="PM" />
                                </DropDownMenu>
                            </Col>
                            <Col sm={2}>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                            {
                                this.state.errorText !== null 
                                ? <div style={styles.errorText}>{this.state.errorText}</div>
                                : null 
                            }
                            </Col>
                        </Row>
                        <Row>
                        {
                            !dataStore.currentUser
                            ? 
                            <div>Loading...</div>
                            :
                            <Table
                                onCellClick={this.handleShiftToggle} 
                                style={styles.table}
                            >
                                    <TableHeader
                                        displaySelectAll={false}
                                        adjustForCheckbox={false}
                                    >
                                        <TableRow
                                            displayBorder={false}
                                            hoverable={false}>
                                            <Hidden xs sm>
                                                <TableHeaderColumn style={{ width: 20, align: 'center' }}></TableHeaderColumn>
                                            </Hidden>
                                                <TableHeaderColumn style={styles.shiftTableHeader}></TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Sunday</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Monday</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Tuesday</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Wednesday</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Thursday</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Friday</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.shiftTableHeader}>Saturday</TableHeaderColumn>

                                        </TableRow>
                                        <TableRow
                                            style={styles.shiftTableHeaderArea}
                                            displayBorder={false}
                                            hoverable={false}>
                                            <Hidden xs sm>
                                                <TableHeaderColumn style={{ width: 20, align: 'center' }}></TableHeaderColumn>
                                            </Hidden>
                                            <TableHeaderColumn style={styles.shiftTableHeader}></TableHeaderColumn>
                                            {
                                                weekDatesArr.map((header, index) => {
                                                    return <TableHeaderColumn key={index}>{formatDate(header)}</TableHeaderColumn>
                                                })
                                            }

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        displayRowCheckbox={false}
                                    >
                                        {employeeRows}
                                    </TableBody>
                                </Table>
                            }
                        </Row>
                        </PaperCard>
                    </Col>
                </Row>
               
            </div >
        );
    }
}