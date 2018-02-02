import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    features: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-start',
        flexFlow: 'row wrap',
        height: '300px',
    },
    item: {
       height: 300,
    },
    circle: {
        backgroundColor: '#34485d',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        textAlign: 'center',
        margin: '0 auto',
    },
    icon: {
        fontSize: '6rem',
        color: '#FFF',
        padding: '40px'
    },
    desc: {
        marginTop: '50px'
    },
    descInfo: {
        color: '#6d7986',
    }
}
  
const Features = () => (
    <div style={styles.features} className={'feature'}>
        <div style={styles.item} className={'feature-item'}>
            <div style={styles.circle}>
                <FontIcon style={styles.icon} className="material-icons">add_location</FontIcon>
                <div style={styles.desc}>
                    <h2>Add Location</h2>
                    <p style={styles.descInfo}>Some text that explains the feature offered</p>
                </div>
            </div>
        </div>
        <div style={styles.item} className={'feature-item'}>
            <div style={styles.circle}>
                <FontIcon style={styles.icon} className="material-icons">group</FontIcon>
                <div style={styles.desc}>
                    <h2>Create Teams</h2>
                    <p style={styles.descInfo}>Some text that explains the feature offered</p>
                </div>
            </div>
        </div>
        <div style={styles.item} className={'feature-item'}>
            <div style={styles.circle}>
                <FontIcon style={styles.icon} className="material-icons">schedule</FontIcon>
                <div style={styles.desc}>
                    <h2>Track Shifts</h2>
                    <p style={styles.descInfo}>Some text that explains the feature offered</p>
                </div>
            </div>
        </div>
    </div>
);

export default Features;