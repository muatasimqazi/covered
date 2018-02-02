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

const AppBarTop = () => (
  <AppBar
    title={<span style={styles.title}>Covered</span>}
    style={styles.appBar}
    iconElementRight={<FlatButton label="Login" />}
  />
);

export default AppBarTop;