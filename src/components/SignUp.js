import React from 'react';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore';
import { ROUTES } from '../constants';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-grid-system'
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
  },
  radioButtonGroup: {
    display: 'flex',
    maxWidth: 130,
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
      dataStore.createEmployeeAccountFromRoster(user, () => {
        console.log('...', dataStore.error)
        if (!dataStore.error) {
          this.props.history.push(ROUTES.dashboard);
        }
      });
    } else {
      dataStore.createSupervisorAccount(user, this.state.teamName);
    }

  }

  render() {
    let user = this.state.user;
    return (
      <div style={styles.container}>
        <Row>
          <Col sm={12}>
            <Paper style={styles.card}>

              <h1>Sign-Up</h1>

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
                      />
                      <p>Supervisor Information:</p>
                    </div>
                    :
                    <TextField
                      hintText='Team ID'
                      name='teamId'
                      onChange={this.handleChange}
                      value={user.teamId}
                    />
                }
                <TextField
                  hintText='First name'
                  name='firstName'
                  onChange={this.handleChange}
                  value={user.firstName}
                />
                <br />
                <TextField
                  hintText='Last name'
                  name='lastName'
                  onChange={this.handleChange}
                  value={user.lastName}
                />
                <br />

                <TextField
                  hintText='Email'
                  name='email'
                  onChange={this.handleChange}
                  value={user.email}
                  type='email'
                />
                <br />
                <TextField
                  hintText='Phone Number'
                  name='phone'
                  onChange={this.handleChange}
                  type='text'
                  value={user.phone}
                />
                <br />
                <TextField
                  hintText='Password'
                  name='password'
                  onChange={this.handleChange}
                  type='password'
                  value={user.password}
                />
                <br />
                <TextField
                  hintText='Confirm Password'
                  name='confirmPassword'
                  onChange={this.handleChange}
                  type='password'
                  value={user.confirmPassword}
                />
                <br />
                <RaisedButton
                  label="Cancel"
                  primary={true}
                  style={styles.button}
                  onClick={() => this.handleClick(null)}
                />
                <RaisedButton
                  label="Submit"
                  secondary={true}
                  style={styles.button}
                  type="submit"
                />
              </form>

            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignUp;