import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppBar
        title={<span style={styles.title}>Covered</span>}
        style={styles.appBar}
        iconElementRight={<FlatButton label="Log In" onClick={this.props.onLoginClick} />}
      />
    );
  }
}

export default AppBarTop;