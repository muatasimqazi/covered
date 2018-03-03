
//@ts-check
import React from 'react';
import { Link } from 'react-router-dom';
import PaperCard from '../PaperCard';
import TableCard from '../TableCard';
import { Row, Col } from 'react-grid-system'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import SingleEmployee from './SingleEmployee';
import { observer } from 'mobx-react';

import { dataStore } from '../../DataStore';
@observer
export default class FullRoster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        let employees = [];
        let num = [1, 2, 3, 4, 5, 6]
        /*this.props.employeesSnap*/ // use forEach for snap
        dataStore.employeesArray.map((employee, index) => {
            console.log(index)
            employees.push(
                <SingleEmployee employeeID={index} employee={employee} />
            )
        })
        console.log(employees)
        return (
            <div>
                <Row>
                    <Col>
                        <PaperCard
                            slug="Store Employees"
                            title="Roster"
                        >
                            <Table>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn style={{ width: 20 }}>ID</TableHeaderColumn>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Phone</TableHeaderColumn>
                                        <TableHeaderColumn>Email</TableHeaderColumn>
                                        <TableHeaderColumn>Lastest Shift</TableHeaderColumn>
                                        <TableHeaderColumn>Edit Shift</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    deselectOnClickaway={true}
                                    showRowHover={true}
                                    stripedRows={true}
                                >
                                    {employees}
                                </TableBody>
                            </Table>
                        </PaperCard>
                    </Col>
                </Row>
            </div >
        );
    }
}