import React from 'react';
import './Fade.css'

const Fade = (props) => {
    const animationsList = ['fadein', 'fadeout']
    const animationType = animationsList.includes(props.animationType) ? props.animationType : 'fadein';
    return (
        <React.Fragment>
            <div style={{ animation: `${animationType} 3s linear 1s 1 alternate` }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Fade;
