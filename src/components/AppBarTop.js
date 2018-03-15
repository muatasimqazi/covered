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
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore';
import { green700, green900 } from 'material-ui/styles/colors'

const styles = {
  appBar: {
    backgroundColor: green700,
    position: 'fixed',
    top: 0,
    zIndex: 1500,
  },
  icons: {
    color: '#9a9a9a'
  }
};

class AppBarTop extends React.Component {

  handleClick = () => this.props.history.push('/');

  handleLogIn = () => this.props.history.push(ROUTES.signIn);

  handleLogOut = () => {
    dataStore.logOut();
    this.props.history.push('/');
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
          showMenuIconButton={dataStore.isLoggedIn}
          iconElementRight={dataStore.isLoggedIn ?
            <FlatButton label="Log Out" onClick={() => this.handleLogOut()} /> :
            <FlatButton label="Log In" onClick={() => this.handleLogIn()} />
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
              leftIcon={<FontIcon className="material-icons" style={styles.icons}>people</FontIcon>}
              containerElement={<Link to={ROUTES.roster} />}
            />
            {dataStore.currentUser && dataStore.currentUser.role === 'supervisor' &&
              <div>
                <Divider />
                <MenuItem
                  onClick={this.props.handleDrawerToggle}
                  primaryText="Manage Shifts"
                  leftIcon={<FontIcon className="material-icons" style={styles.icons}>access_time</FontIcon>}
                  containerElement={<Link to={ROUTES.shifts} />}
                />
                <Divider />
                <MenuItem
                  onClick={this.props.handleDrawerToggle}
                  primaryText="Manage Coverage"
                  leftIcon={<FontIcon className="material-icons" style={styles.icons}>event_available</FontIcon>}
                  containerElement={<Link to={ROUTES.coverage} />}
                />
              </div>
            }
          </Menu>
        </Drawer>
        <div style={{ height: 64 }} />
      </div>
    );
  }
}

export default withRouter(AppBarTop);