import React from 'react';
import calender from '../img/calendar.svg';

const styles = {
    hero: {
        backgroundColor: '#e5b252',
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
const Hero = () => (
    <div>
        <div style={styles.hero} className={'hero'}>
            <div style={styles.heroTitle} className={'hero-title'}>
                <h1>Covered</h1>
                <p>An intutive app to simplify your scheduling</p>
            </div>
            <div style={styles.heroImage} className={'hero-img'}></div>
        </div>
    </div>
);

export default Hero;