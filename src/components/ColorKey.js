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
      color: '#99e',
      bkgdColor: '#bbf',
      avatarIcon: 'help_outline',
      text: 'Too much coverage!'
    }, {
      color: '#9e9',
      bkgdColor: '#bfb',
      avatarIcon: 'done',
      text: '100% coverage'
    }, {
      color: '#dd8',
      bkgdColor: '#ffb',
      avatarIcon: 'error_outline',
      text: 'Understaffed'
    }, {
      color: '#faa',
      bkgdColor: '#fbb',
      avatarIcon: 'error',
      text: 'Severely understaffed!'
    }];
    return (
      <div>
        {chipData.map((chip, i) => 
          <Chip
            backgroundColor={chip.bkgdColor}
            key={i}
            style={styles.chip}
          >
            <Avatar color={'#fff'} backgroundColor={chip.color}>
              <FontIcon className="material-icons" style={styles.icons}>{chip.avatarIcon}</FontIcon>
            </Avatar>
            {chip.text}
          </Chip>      
        )}
      </div>
    );
  }
}

export default ColorKey;