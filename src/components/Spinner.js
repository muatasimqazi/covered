import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
const style = {
    left: -40,
    top: 200,
    marginLeft: '50%'
};
const Spinner = (props) => (
    <div>
        <CircularProgress
            style={{...style, ...props.style}}
            size={props.size}
            thickness={5}
        />
    </div>
);

export default Spinner;