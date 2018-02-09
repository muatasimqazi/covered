import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
const styles = {
    spinner: {
        left: -50,
        top: 200,
        marginLeft: '50%'
    }
  };
const Spinner = () => (
  <div>
    <CircularProgress 
        style={styles.spinner}
        size={100} 
        thickness={5} 
        
        />
  </div>
);

export default Spinner;