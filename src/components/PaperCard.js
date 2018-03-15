//@ts-check
import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  padding: 16,
  marginTop: 30,
  marginBottom: 30,
  boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)',
  borderRadius: '.1875rem',
};

class PaperCard extends React.Component {
  render() {
    return (
      <Paper
        style={style} zDepth={undefined}
      >
        <div style={{ display: 'flex' }}>
          <h5 style={{ flex: 1 }}> {this.props.slug}</h5>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>{this.props.image}<h4>{this.props.title}</h4></div>
        {this.props.children}

      </Paper>
    );
  }
}

PaperCard.defaultProps = {
  height: 200
}
export default PaperCard;