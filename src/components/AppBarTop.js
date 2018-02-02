import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const AppBarTop = () => (
  <AppBar
    title={<span style={styles.title}>Covered</span>}
    style={{backgroundColor:'#598d1c'}}
    iconElementRight={<FlatButton label="Login" />}
  />
);

export default AppBarTop;