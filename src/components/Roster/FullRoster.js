//@ts-check
/* eslint-disable no-unused-vars */
import React from 'react';
import PaperCard from '../PaperCard';
import { Row, Col, Hidden } from 'react-grid-system'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import SingleEmployee from './SingleEmployee';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
const styles = {
    table: {
        overflowX: 'auto',
    },
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
                        </PaperCard>
                    </Col>
                </Row>
            </div >
        );
    }
}