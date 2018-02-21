import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
const style = {
    left: -40,
    top: 200,
    marginLeft: '50%'
};
const Spinner = () => (
    <div>
        <CircularProgress
            style={style}
            size={80}
            thickness={5}
        />
    </div>
);

export default Spinner;