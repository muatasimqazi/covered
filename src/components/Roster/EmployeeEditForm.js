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
        console.log(dataStore.getEmployee(this.props.match.params.id))
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };
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
                            <TextField
                                id="text-field-controlled"
                                floatingLabelText="First Name"
                                value={this.state.value}
                                style={styles.textField}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="text-field-controlled"
                                floatingLabelText="Email"
                                value={this.state.value}
                                style={styles.textField}
                                onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                id="text-field-controlled"
                                floatingLabelText="Last Name"
                                value={this.state.value}
                                style={styles.textField}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="text-field-controlled"
                                floatingLabelText="Phone Number"
                                value={this.state.value}
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
                                    onClick={() => alert()}
                                />
                            </div>
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