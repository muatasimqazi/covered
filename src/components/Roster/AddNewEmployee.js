//@ts-check
/* eslint-enable no-unused-vars */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PaperCard from "../PaperCard";
import { RaisedButton, Snackbar } from 'material-ui';
import { ROUTES } from "../../constants";
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore'
import Spinner from '../Spinner';

const styles = {
    button: {
        margin: 15,
    }
}
@observer
class AddNewEmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                password: 'covered',
                role: 'employee',
            },
            open: false,

        };
    }

    handleChange = (evt) => {
        dataStore.error = '';
        let employee = { ...this.state.employee, [evt.target.name]: evt.target.value, }
        this.setState({ employee });
    };

    handleSumbit(evt) {
        evt.preventDefault();
        dataStore.createEmployeeAccountFromRoster(this.state.employee, () => {
            console.log('...', dataStore.error)
            if (!dataStore.error) {
                this.props.history.push(ROUTES.roster);
            }
            });

    }
    render() {
        return (
            <PaperCard
                title="Add New Employee"
            >
                {
                    dataStore.isBusy
                        ?
                        <Spinner size={80} style={{ top: 2 }} />
                        :
                        <div>
                            <Snackbar
                                open={dataStore.error !== '' || this.state.open}
                                message={dataStore.error}
                                autoHideDuration={1500}
                                style={{ top: 100 }}
                            />
                            <form onSubmit={evt => this.handleSumbit(evt)}>
                                <TextField
                                    name="firstName"
                                    hintText="First Name"
                                    floatingLabelText="Employee First Name"
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <br />
                                <TextField
                                    name="lastName"
                                    hintText="Last Name"
                                    floatingLabelText="Employee Last Name"
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <br />
                                <TextField
                                    name="email"
                                    hintText="Email"
                                    floatingLabelText="Employee Email"
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <br />
                                <TextField
                                    name="phone"
                                    hintText="Phone Number"
                                    floatingLabelText="Employee Number"
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <br />
                                <RaisedButton
                                    label="Add"
                                    primary={true}
                                    type="submit"
                                />
                                <RaisedButton
                                    label="Back"
                                    style={styles.button}
                                    onClick={() => this.props.history.push(ROUTES.roster)}
                                />
                            </form>
                        </div>
                }
            </PaperCard>
        );
    }
}

export default AddNewEmployeeForm;

