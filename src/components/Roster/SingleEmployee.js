//@ts-check
import React from 'react';
import { TableRow, TableRowColumn, RaisedButton } from 'material-ui';
import Spinner from '../Spinner';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';

const style = {
    margin: 12,
};

@observer
export default class SingleEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }


    handleEdit() {
        this.props.history.push(ROUTES.signIn)
        //    let employeeRef = window.employeeRef = this.props.employee;

        //    dataStore.deleteEmployee(this.props.employee);
        //    console.log(employeeRef)

    }
    render() {
        let employee = this.props.employee;
        if (!employee) {
            return <Spinner size={80} style={{ top: 200 }} />
        }
        return (
            <TableRow key={this.props.employeeID} striped={this.props.employeeID % 2 == 0}>
                <TableRowColumn style={{ width: 20 }}>{this.props.employeeID + 1}</TableRowColumn>
                <TableRowColumn>{employee.firstName} {employee.lastName}</TableRowColumn>
                <TableRowColumn>{employee.phone}</TableRowColumn>
                <TableRowColumn>{employee.email}</TableRowColumn>
                <TableRowColumn>{new Date().toLocaleTimeString()}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="Edit"
                        style={style}
                        containerElement={<Link to={`${ROUTES.roster}/${employee.id}`}/>}
                    />
                </TableRowColumn>
            </TableRow>

        );
    }
}