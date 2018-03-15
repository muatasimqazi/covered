import React from 'react';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore';
import { ROUTES } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system'
import PaperCard from './PaperCard';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
const styles = {
  button: {
    margin: 12,
  },
  radioButtonGroup: {
    display: 'flex',
    maxWidth: 150,
  },
  radioButton: {
    flex: 1,
  }
}

@observer
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      user: {
        firstName: '',
        lastName: '',
        role: 'supervisor',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        teamId: '',
      }
    }

  }
  handleChange = (e) => {
    let user = { ...this.state.user, [e.target.name]: e.target.value };
    this.setState({ user });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let user = this.state.user;
    if (user.role === 'employee') {
      dataStore.createEmployeeAccount(user, () => {
        console.log('...', dataStore.error)
        if (!dataStore.error) {
          this.props.history.push(ROUTES.dashboard);
        }
      });
    } else {
      dataStore.createSupervisorAccount(user, this.state.teamName);
    }

  }

  handleClick = () => this.props.history.push("/");

  render() {
    let user = this.state.user;
    return (
      <Container>
        <Row>
          <Col className="auth" md={5} sm={12}>
            <PaperCard>
              <div>
                <h4 style={{ padding: 5 }}>Sign Up</h4>
                <Divider />
                <br />
                <form onSubmit={evt => this.handleSubmit(evt)}>
                  <RadioButtonGroup name="role" defaultSelected="supervisor" style={styles.radioButtonGroup}
                    onChange={this.handleChange}
                  >
                    <RadioButton
                      value="supervisor"
                      label="Supervisor"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="employee"
                      label="Employee"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                  {
                    user.role === 'supervisor'
                      ?
                      <div>
                        <p>Store Information:</p>
                        <TextField
                          hintText='Team Name'
                          name='teamName'
                          onChange={evt => this.setState({ teamName: evt.target.value })}
                          value={this.state.teamName}
                          fullWidth={true}
                        />
                        <p>Supervisor Information:</p>
                      </div>
                      :
                      <TextField
                        hintText='Team ID'
                        name='teamId'
                        onChange={this.handleChange}
                        value={user.teamId}
                        fullWidth={true}
                      />
                  }
                  <TextField
                    hintText='First name'
                    name='firstName'
                    onChange={this.handleChange}
                    value={user.firstName}
                    fullWidth={true}
                  />
                  <br />
                  <TextField
                    hintText='Last name'
                    name='lastName'
                    onChange={this.handleChange}
                    value={user.lastName}
                    fullWidth={true}
                  />
                  <br />

                  <TextField
                    hintText='Email'
                    name='email'
                    onChange={this.handleChange}
                    value={user.email}
                    type='email'
                    fullWidth={true}
                  />
                  <br />
                  <TextField
                    hintText='Phone Number'
                    name='phone'
                    onChange={this.handleChange}
                    type='text'
                    value={user.phone}
                    fullWidth={true}
                  />
                  <br />
                  <TextField
                    hintText='Password'
                    name='password'
                    onChange={this.handleChange}
                    type='password'
                    value={user.password}
                    fullWidth={true}
                  />
                  <br />
                  <TextField
                    hintText='Confirm Password'
                    name='confirmPassword'
                    onChange={this.handleChange}
                    type='password'
                    value={user.confirmPassword}
                    fullWidth={true}
                  />
                  <br />
                  <div align="right">
                    <RaisedButton
                      label="Cancel"
                      primary={true}
                      style={styles.button}
                      onClick={() => this.handleClick()}
                    />
                    <RaisedButton
                      label="Submit"
                      secondary={true}
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

export default SignUp;