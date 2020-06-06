import React from 'react';
import './Fade.css'

const Fade = (props) => {
    const validateProps = () => {
        if (props.delay && isNaN(parseFloat(props.delay))) {
            throw new TypeError(`Expected a number, got ${typeof props.delay}`)
        } else if (props.duration && isNaN(parseFloat(props.duration))) {
            throw new TypeError(`Expected a number, got ${typeof props.duration}`)
        } else if (props.iterate && isNaN(props.iterate) && props.iterate !== 'infinite') {
            throw new TypeError(`Expected a number, got ${typeof props.duration}`)
        }
    }
    validateProps();
    const animationsList = ['fadein', 'fadeout']
    const type = animationsList.includes(props.type) ? props.type : 'fadein';
    const delay = props.delay ? `${props.delay}s` : '1s';
    const duration = props.duration ? `${props.duration}s` : '2s';
    const iterate = props.iterate ? props.iterate : '1';
    const timimgFn = props.timimgFn ? props.timimgFn : 'ease';
    return (
        <React.Fragment>
            <div style={{ animation: `${type} ${duration} ${timimgFn} ${delay} forwards ${iterate}` }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Fade;
