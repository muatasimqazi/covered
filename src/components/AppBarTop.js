import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const styles = {
  title: {
    cursor: 'pointer',
  },
  appBar: {
    backgroundColor:'#598d1c',
    position: 'fixed',
    zIndex: 999,
  }
};

class AppBarTop extends React.Component {
  render() {
    return (
      <AppBar
        title={<Link to='/' style={styles.title}>Covered</Link>}
        style={styles.appBar}
        iconElementRight={this.props.loggedIn ?
          <FlatButton label="Log Out" onClick={this.props.onLogoutClick} /> :
          <FlatButton label="Log In" onClick={this.props.onLoginClick} />
        }
      />
    );
  }
}

export default AppBarTop;