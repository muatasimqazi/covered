import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

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

const NotificationMessages = () => (
    <div>
        <List>
            <Subheader>Today</Subheader>
            <ListItem
                leftAvatar={<Avatar src={profiles[0].src} />}
                primaryText="Monday Afternoon Shift"
                secondaryText={
                    <p>
                        <span style={{ color: darkBlack }}>Brendan Lim</span> --
                        Will you be interested in switching shifts for coming Monday afternoon?
            </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
                leftAvatar={<Avatar src={profiles[1].src} />}
                primaryText={
                    <p>Need Someone to Cover my Shift</p>
                }
                secondaryText={
                    <p>
                        I have something to do this Sunday. Anybody interested in covering for me?
            </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
                leftAvatar={<Avatar src={profiles[2].src} />}
                primaryText="Friday Morning Shift Available"
                secondaryText={
                    <p>
                        I have an appointment this Friday and want someone to cover it for me.
            </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
                leftAvatar={<Avatar src={profiles[3].src} />}
                primaryText="Switch Shifts?"
                secondaryText={
                    <p>
                        <span style={{ color: darkBlack }}>Kerem Suer</span> --
                        I see you're requested for a shift this Tuesday. I can switch.
            </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
                leftAvatar={<Avatar src={profiles[4].src} />}
                primaryText="Anybody Wants to Monday Morning?"
                secondaryText={
                    <p>
                        <span style={{ color: darkBlack }}><b>Manager</b></span>:
                        Check out the calendar. We have two requests for Wednesday evening.
            </p>
                }
                secondaryTextLines={2}
            />
        </List>

    </div>
);

export default NotificationMessages;