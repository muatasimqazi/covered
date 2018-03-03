//@ts-check
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import PaperCard from '../PaperCard';
import { Row, Col, Hidden } from 'react-grid-system';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import SingleEmployee from './SingleEmployee';
import AddNewEmployeeForm from './AddNewEmployee';

import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
import { RaisedButton } from 'material-ui';
import { ROUTES } from '../../constants';
const styles = {
    table: {
        overflowX: 'auto',
    },
    button: {
        marginTop: 20,
    }
}
@observer
export default class FullRoster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let colHeader = ["Name", "Phone", "Email", "Latest Shift", "Edit Employee"]
        let employees = [];
        dataStore.employeesArray.forEach((employee, index) => {
            employees.push(
                <SingleEmployee key={index} employee={employee} index={index} />
            )
        })
        return (
            <div>
                <Row>
                    <Col>
                        <PaperCard
                            slug="Manage Employees"
                            title="Employees Roster"
                        >
                            <Table style={styles.table}>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow
                                        hoverable={true}>
                                        <Hidden xs sm>
                                            <TableHeaderColumn style={{ width: 20, align: 'center' }}></TableHeaderColumn>
                                        </Hidden>
                                        {
                                            colHeader.map((header, index) => {
                                                return <TableHeaderColumn key={index}>{header}</TableHeaderColumn>
                                            })
                                        }

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees}
                                </TableBody>
                            </Table>
                            <div align="right">
                                <RaisedButton
                                    label="Add New Employee"
                                    align="right"
                                    primary={true}
                                    style={{ color: '#B71C1C', ...styles.button }}
                                    containerElement={<Link to={`${ROUTES.addEmployee}`} />}
                                />
                            </div>

                        </PaperCard>
                    </Col>
                </Row>
            </div >
        );
    }
}