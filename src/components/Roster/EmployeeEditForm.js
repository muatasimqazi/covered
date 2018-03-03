//@ts-check
import React from 'react';
import TextField from 'material-ui/TextField';
import PaperCard from '../PaperCard';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore';
import Avatar from 'material-ui/Avatar';
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import { ROUTES } from '../../constants';

const styles = {
    textField: {
        marginRight: 100,
    },
    button: {
        margin: 12,
    }
}
@observer
class EmployeeEditForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: 'Property Value',
            employee: dataStore.selectedEmployee,
        };
    }
    componentDidMount() {
        dataStore.getEmployee(this.props.match.params.id);
        this.setState({
            employee: dataStore.selectedEmployee
        });
    }

    handleChange = (evt) => {
        
        let employee = { ...this.state.employee, [evt.target.name]: evt.target.value, }
        this.setState({ employee });
    };

    handleSubmit(evt) {
        evt.preventDefault();
        dataStore.editEmployee(this.props.match.params.id, this.state.employee);
        this.props.history.push(ROUTES.roster);
    }
    render() {
        let employee = dataStore.selectedEmployee;
        return (
            <Row>
                <Col sm={9}>
                    <PaperCard
                        image={<Avatar size={60} style={{ margin: 15 }} src="http://www.material-ui.com/images/uxceo-128.jpg" />}
                        title={`${employee.firstName} ${employee.lastName}`}
                    >
                        <div>
                            <form onSubmit={(evt) => this.handleSubmit(evt)}>
                                <TextField
                                    name="firstName"
                                    floatingLabelText="First Name"
                                    value={this.state.employee.firstName || ''}
                                    style={styles.textField}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name="email"
                                    floatingLabelText="Email"
                                    value={this.state.employee.email || ''}
                                    style={styles.textField}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <TextField
                                    name="lastName"
                                    floatingLabelText="Last Name"
                                    value={this.state.employee.lastName || ''}
                                    style={styles.textField}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name="phone"
                                    floatingLabelText="Phone Number"
                                    value={this.state.employee.phone || ''}
                                    style={styles.textField}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <div align="right">
                                    <RaisedButton
                                        label="Back"
                                        style={styles.button}
                                        onClick={() => this.props.history.push(ROUTES.roster)}
                                    />
                                    <RaisedButton
                                        primary={true}
                                        label="Save"
                                        style={styles.button}
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </PaperCard>
                </Col>
                <Col sm={3}>
                    <PaperCard />
                </Col>
            </Row>
        );
    }
}
export default EmployeeEditForm