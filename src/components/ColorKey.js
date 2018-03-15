import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon/FontIcon';

const styles = {
  chip: {
    margin: 6,
  }
};

class ColorKey extends React.Component {
  render() {
    const chipData = [{
      color: '#FFF',
      bkgdColor: 'rgb(0, 145, 234)',
      avatarIcon: 'help_outline',
      text: 'Too much coverage!',
      border: '1px solid rgb(0, 145, 234)',
    }, {
      color: '#FFF',
      bkgdColor: 'rgb(56, 142, 60)',
      avatarIcon: 'done',
      text: '100% coverage',
      border: '1px solid rgb(56, 142, 60)',
    }, {
      color: '#FFF',
      bkgdColor: 'rgb(255, 167, 38)',
      avatarIcon: 'error_outline',
      text: 'Understaffed',
      border: '1px solid rgb(255, 167, 38)',
    }, {
      color: '#FFF',
      bkgdColor: 'rgb(255, 87, 34)',
      avatarIcon: 'error',
      text: 'Severely understaffed!',
      labelColor: '#FFF',
      border: '1px solid rgb(255, 87, 34)',
    }];
    return (
      <div>
        {chipData.map((chip, i) =>
          <Chip
            backgroundColor={chip.bkgdColor}
            key={i}
            style={styles.chip}
          >

            <Avatar color={'#fff'} backgroundColor={chip.color} style={{ border: chip.border }}>
              <FontIcon className="material-icons" style={styles.icons}>{chip.avatarIcon}</FontIcon>
            </Avatar>
            <div style={{ color: '#FFF' }}>{chip.text} </div>

          </Chip>
        )}
      </div>
    );
  }
}

export default ColorKey;