/* eslint-disable no-unused-vars */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { observer } from 'mobx-react';
import { dataStore } from '../DataStore';


const profiles = [
    {
        src: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
        src: 'https://randomuser.me/api/portraits/men/86.jpg'
    },
    {
        src: 'https://randomuser.me/api/portraits/men/77.jpg'
    },
    {
        src: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
    {
        src: 'https://randomuser.me/api/portraits/women/22.jpg'
    }
]
const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);

@observer
class NotificationMessages extends React.Component {
    render() {
        return (
            <div>
                < List >
                    <Subheader>Today</Subheader>
                    <ListItem
                        leftAvatar={<Avatar src={profiles[0].src} />}
                        primaryText="New Shift Added"
                        secondaryText={
                            <p>
                                <span style={{ color: darkBlack }}>Brendan Lim</span> --
                                Will you be interested in switching shifts for coming Monday afternoon?
                    </p>
                        }
                        secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                </List >
            </div>
        )
    }
}

export default NotificationMessages;