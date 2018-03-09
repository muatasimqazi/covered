import React from 'react';
import PaperCard from './../PaperCard';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Row, Col, Hidden } from 'react-grid-system'
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';

const styles = {
    weekDefinition: {
        marginTop: 15,
        marginLeft: -25,
        fontFamily: 'Montserrat'
    },
    weekButton: {
        marginTop: 10,
        marginRight: 5,
        marginBottom: 5
    },
    shiftTableHeader: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    }
};

function formatDate(date) {
    // todo: consider making more human friendly - i.e. March 24th, 2018
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

@observer export default class CoverageManager extends React.Component {
    constructor(props) {
        super(props);

        this.handlePrevWeekClick = this.handlePrevWeekClick.bind(this);
        this.handleNextWeekClick = this.handleNextWeekClick.bind(this);
        this.findCoverageByDate = this.findCoverageByDate.bind(this);

        const now = new Date();

        this.state = {
            startOfWeek: new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
        }

    }

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

    findCoverageByDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
    
        if (day < 10) {
          day = '0' + day;
        }
    
        if (month < 10) {
          month = '0' + month;
        }
    
        let dateProp =  `${year}${month}${day}`;

        // return dataStore.coverageObject[dateProp];
    }

    render() {
        let weekDatesArr = [this.state.startOfWeek, new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 1), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 2), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 3), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 4), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 5), new Date(this.state.startOfWeek.getFullYear(), this.state.startOfWeek.getMonth(), this.state.startOfWeek.getDate() + 6)]
        let coverageDetails = weekDatesArr.map((entry, index) => {
           return <TableRowColumn>
                <TextField
                    type='text'
                    defaultValue={this.findCoverageByDate(weekDatesArr[index])}
                />
            </TableRowColumn>
        });

        return (
            <Row>
                {/* Title Area */}
                <Col sm={12}>
                    <PaperCard
                        slug="Quick add coverage"
                        title="Coverage Manager"
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
                        <Table
                        >
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow
                                        displayBorder={false}
                                        hoverable={false}>
                                        <Hidden xs sm>
                                            <TableHeaderColumn style={{ width: 5, align: 'center' }}></TableHeaderColumn>
                                        </Hidden>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Sunday</TableHeaderColumn>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Monday</TableHeaderColumn>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Tuesday</TableHeaderColumn>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Wednesday</TableHeaderColumn>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Thursday</TableHeaderColumn>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Friday</TableHeaderColumn>
                                            <TableHeaderColumn style={styles.shiftTableHeader}>Saturday</TableHeaderColumn>

                                    </TableRow>
                                    <TableRow
                                        displayBorder={false}
                                        hoverable={false}>
                                        <Hidden xs sm>
                                            <TableHeaderColumn style={{ width: 5, align: 'center' }}></TableHeaderColumn>
                                        </Hidden>
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
                                {/* {
                                    dataStore.coverageObject 
                                    ? { coverageDetails }
                                    : null
                                } */}
                                </TableBody>
                            </Table>
                    </PaperCard>
                </Col>
            </Row>
        );
    }
}