import React from 'react';
import './Fade.css'

const Fade = (props) => {
    const animationsList = ['fadein', 'fadeout']
    const animationType = animationsList.includes(props.animationType) ? props.animationType : 'fadein';
    const delay = props.delay ? props.delay : '1s';
    const duration = props.duration ? props.duration : '2s';
    const iterate = props.iterate ? props.iterate : '1';
    const timimgFn = props.timimgFn ? props.timimgFn : 'ease';
    return (
        <React.Fragment>
            <div style={{ animation: `${animationType} ${duration} ${timimgFn} ${delay} forwards ${iterate}` }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Fade;
