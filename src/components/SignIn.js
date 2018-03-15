import React from 'react';
import { ROUTES } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system'
import PaperCard from './PaperCard';
import Divider from 'material-ui/Divider';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore';

const styles = {
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
    handleSubmit(evt) {
        evt.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        dataStore.logIn(email, password);
        this.props.history.push(ROUTES.dashboard)
    }
    handleCancel() {
        this.props.history.push(ROUTES.home)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="auth" md={5} sm={12}>
                        <PaperCard>
                            <div>
                                <h4 style={{ padding: 5 }}>Login</h4>
                                <Divider />
                                <br />
                                <form onSubmit={evt => this.handleSubmit(evt)}>
                                    <TextField
                                        hintText='Email'
                                        name='email'
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        fullWidth={true}
                                    />
                                    <br />
                                    <TextField
                                        hintText='Password'
                                        name='password'
                                        onChange={this.handleChange}
                                        type='password'
                                        value={this.state.password}
                                        fullWidth={true}
                                    />
                                    <div align="right">
                                        <RaisedButton
                                            label="Cancel"
                                            secondary={true}
                                            style={styles.button}
                                            onClick={() => this.handleCancel()}
                                        />
                                        <RaisedButton
                                            label="Login"
                                            primary={true}
                                            style={styles.button}
                                            type="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </PaperCard>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SignIn;