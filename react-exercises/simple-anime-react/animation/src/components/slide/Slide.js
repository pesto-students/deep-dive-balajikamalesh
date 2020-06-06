import React from 'react';
import './Slide.css'

const Slide = (props) => {
    const animationsList = ['slidein', 'slideout']
    const animationType = animationsList.includes(props.animationType) ? props.animationType : 'slidein';
    return (
        <React.Fragment>
            <div style={{ animation: `${animationType} ${props.duration} ease ${props.delay} forwards ${props.iterate}`, height: '100%', width: '100%' }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Slide;
