import React from 'react';
import PropTypes from 'prop-types'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green700, green800 } from 'material-ui/styles/colors';
import calendar from '../img/calendar.svg';
import location from '../img/location.svg';
import team from '../img/team.svg';
import time from '../img/time.svg';
import notification from '../img/notification.svg';

const icons = [
    {
        image: calendar,
        title: 'Covered',
        desc: 'An intuitive app to simplify your scheduling'
    },
    {
        image: location,
        title: 'Add Location',
        desc: 'Provide details of your store'
    },
    {
        image: team,
        title: 'Create Teams',
        desc: 'Add members to your team'
    },
    {
        image: time,
        title: 'Track Shifts',
        desc: 'Run your store more smoothly'
    },
    {
        image: notification,
        title: 'Stay Updated',
        desc: 'Get notifications of new requests'
    },
]

class Hero extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    render() {
        return (
            <div>
                <AutoRotatingCarousel
                    label="Get Started"
                    open
                    mobile
                    interval={5000}
                    onStart={() => this.context.router.history.push(`/signup`)}
                    style={{ position: 'relative', 'top': -60 }}
                >
                    {
                        icons.map((item, index) =>
                            <Slide
                                key={index}
                                media={<img src={item.image} alt={item.title} />}
                                mediaBackgroundStyle={{ backgroundColor: green700 }}
                                contentStyle={{ backgroundColor: green800 }}
                                title={item.title}
                                subtitle={item.desc}
                            />
                        )
                    }
                </AutoRotatingCarousel>
            </div>
        )
    }
}
export default Hero;