/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import { Menu, MenuItem } from 'material-ui';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import { Divider } from 'material-ui';
import { ROUTES } from '../constants';

const styles = {
  appBar: {
    backgroundColor: '#598d1c',
    position: 'fixed',
    top: 0,
    zIndex: 999,
  },
  icons: {
    color: '#9a9a9a'
  }
};

class AppBarTop extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      drawerOpen: false,
    }
  }
  handleToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });
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
          onLeftIconButtonClick={this.props.handleDrawerToggle}
          showMenuIconButton={true}
          iconElementRight={this.props.loggedIn ?
            <FlatButton label="Log Out" onClick={this.props.onLogoutClick} /> :
            <FlatButton label="Log In" onClick={this.props.onLoginClick} />
          }
        />
        <Drawer
          docked={false}
          open={this.props.drawerOpen}
          onRequestChange={(open) => this.props.handleDrawerOverlay(open)}
          swipeAreaWidth={100}
          overlayStyle={{ background: undefined }}

        >
          <Menu>
            <MenuItem
              onClick={this.props.handleDrawerToggle}
              primaryText="Employee Roster"
              leftIcon={<FontIcon className="material-icons" style={styles.icons}>people</FontIcon>
              }
              containerElement={<Link to={ROUTES.roster} />}
            />
            <Divider />
            <MenuItem
              onClick={this.props.handleDrawerToggle}
              primaryText="Manage Shifts"
              leftIcon={<FontIcon className="material-icons" style={styles.icons}>access_time</FontIcon>
              }
              containerElement={<Link to={ROUTES.shifts} />}
            />
          </Menu>
        </Drawer>
        <div style={{ height: 64 }} />
      </div>

    );
  }
}

export default withRouter(AppBarTop);