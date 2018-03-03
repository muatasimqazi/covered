import React from 'react';
import { ROUTES } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-grid-system'
import Paper from 'material-ui/Paper';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore';

const styles = {
    card: {
        width: 350,
        margin: 20,
        padding: 20,
        display: 'inline-block',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 12,
    }
}
@observer
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            displayName: '',
        }
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    componentDidMount() {
        if (dataStore.isLoggedIn) {
            this.props.history.push(ROUTES.manager);
        }
    }

    handleChange = (e) => {
        this.setState({
            fbError: undefined,
            [e.target.name]: e.target.value
        });
    }
    handleSignIn() {
        let email = this.state.email;
        let password = this.state.password;
        dataStore.logIn(email, password);
        this.props.history.push(ROUTES.dashboard)

    }

    render() {
        return (
            <div style={styles.container}>
                <Row>
                    <Col sm={12}>
                        <Paper style={styles.card}>
                            <h4>Login</h4>
                            <br />
                            <TextField
                                hintText='Email'
                                name='email'
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <br />
                            <TextField
                                hintText='Password'
                                name='password'
                                onChange={this.handleChange}
                                type='password'
                                value={this.state.password}
                            />
                            <RaisedButton
                                label="Cancel"
                                secondary={true}
                                style={styles.button}
                                onClick={() => this.handleClick(null)}
                            />
                            <RaisedButton
                                label="Login"
                                primary={true}
                                style={styles.button}
                                onClick={this.handleSignIn}
                            />
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SignIn;