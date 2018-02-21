import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  padding: 16,
  marginTop: 30,
  marginBottom: 30,
};

class PaperCard extends React.Component {
  render() {
    return (
        <Paper 
          style={style} zDepth={1}
          children={this.props.children}
        />
    );
  }
}

PaperCard.defaultProps = {
  height: 200
}
export default PaperCard;