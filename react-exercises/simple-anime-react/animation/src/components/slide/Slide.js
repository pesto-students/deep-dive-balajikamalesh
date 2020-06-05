import React from 'react';
import './Slide.css'

const Slide = (props) => {
    return (
        <React.Fragment>
            <div style={{ animation: 'slidein 3s linear 1s 1 alternate' }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Slide;
