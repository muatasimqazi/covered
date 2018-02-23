import React from 'react';
import calender from '../img/calendar.svg';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const styles = {
    hero: {
        background: '#598d1c',
        backgroundImage: 'linear-gradient(to bottom, #598d1c 25%, #285f00 75%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF'
    },
    heroTitle: {
        flex: 2,
    },
    heroImage: {
        flex: 2,
        backgroundImage: `url(${calender})`,
    }
}
class Hero extends React.Component {
    render() {
        return (
                <div style={styles.hero} className={'hero'}>
                    <div style={styles.heroTitle} className={'hero-title'}>
                        <h1>Covered</h1>
                        <p>An intuitive app to simplify your scheduling</p>
                        <RaisedButton label="Sign up" secondary={true} containerElement={<Link to="/signup"></Link>} />
                    </div>
                    <div style={styles.heroImage} className={'hero-img'}></div>
                </div>
        )
    }
}
export default Hero;