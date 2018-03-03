//@ts-check
/* eslint-disable no-used-var */
import React from 'react';
import { TableRow, TableRowColumn, FlatButton, Avatar } from 'material-ui';
import Spinner from '../Spinner';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';


const styles = {
    button: {
        margin: 5,
    }
};
@observer
export default class SingleEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        dataStore.deleteEmployee(this.props.employee);
    }
    render() {
        let employee = this.props.employee;
        if (!employee) {
            return <Spinner size={80} style={{ top: 200 }} />
        }
        return (
            <TableRow striped={this.props.index % 2 === 0} hoverable={true}>

                <TableRowColumn style={{ width: 20 }}><Avatar size={20} src={employee.photoURL ? employee.photoURL : "http://www.material-ui.com/images/uxceo-128.jpg"} /></TableRowColumn>


                <TableRowColumn>{employee.firstName} {employee.lastName}</TableRowColumn>
                <TableRowColumn>{employee.phone}</TableRowColumn>
                <TableRowColumn>{employee.email}</TableRowColumn>
                <TableRowColumn>{new Date().toLocaleTimeString()}</TableRowColumn>
                <TableRowColumn>
                    <div style={{ display: 'flex' }}>
                        <FlatButton
                            label="Edit"
                            style={styles.button}
                            containerElement={<Link to={`${ROUTES.roster}/${employee.id}`} />}
                        />
                        <FlatButton
                            label="Delete"
                            style={{ color: '#B71C1C', ...styles.button }}
                            onClick={this.handleDelete}
                        />
                    </div>
                </TableRowColumn>
            </TableRow>

        );
    }
}