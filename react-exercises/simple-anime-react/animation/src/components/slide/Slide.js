import React from 'react';
import './Slide.css'

const Slide = (props) => {
    return (
        <React.Fragment>
            <div style={{ animation: '3s linear 1s infinite alternate slidein' }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Slide;
