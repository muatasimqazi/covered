import React from 'react';
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  appBar: {
    backgroundColor: '#598d1c',
    position: 'fixed',
    top: 0,
    zIndex: 999,
  }
};

class AppBarTop extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      open: false,
    }
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClick(e) {
    e.preventDefault();
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <AppBar
          style={styles.appBar}
          title='Covered'
          titleStyle={{ cursor: 'pointer' }}
          zDepth={0}
          onTitleClick={this.handleClick}
          onLeftIconButtonClick={this.handleToggle}
          showMenuIconButton={true}
          iconElementRight={this.props.loggedIn ?
            <FlatButton label="Log Out" onClick={this.props.onLogoutClick} /> :
            <FlatButton label="Log In" onClick={this.props.onLoginClick} />
          }
        />
        <Drawer open={this.state.open}
          onRequestChange={open => this.setState({ open: open })}
        >
          <MenuItem onClick={this.handleToggle}>Menu Item 1</MenuItem>
          <MenuItem onClick={this.handleToggle}>Menu Item 2</MenuItem>
        </Drawer>

      </div>
    );
  }
}

export default withRouter(AppBarTop);