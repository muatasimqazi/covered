import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    features: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-start',
        flexFlow: 'row wrap',
        height: '300px',
        textAlign: 'center',
    },
    item: {
        height: 300,
    },
    circle: {
        backgroundColor: '#34485d',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        textAlign: 'center',
        margin: '0 auto',
    },
    icon: {
        fontSize: '4rem',
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

const icons = [
    {
        icon: 'add_location',
        title: 'Add Location',
        desc: 'Some text that explains the feature offered'
    },
    {
        icon: 'group',
        title: 'Create Teams',
        desc: 'Some text that explains the feature offered'
    },
    {
        icon: 'schedule',
        title: 'Track Shifts',
        desc: 'Some text that explains the feature offered'
    },
    {
        icon: 'notifications',
        title: 'Stay Updated',
        desc: 'Some text that explains the feature offered'
    },
]

const Features = () => (
    <div style={styles.features} className={'feature'}>
        {
            icons.map((item, index) => {
                return (
                    <div style={styles.item} className={'feature-item'}>
                        <div style={styles.circle}>
                            <FontIcon style={styles.icon} className="material-icons">{item.icon}</FontIcon>
                        </div>
                        <div style={styles.desc}>
                            <h2>{item.title}</h2>
                            <p style={styles.descInfo}>{item.desc}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
);

export default Features;