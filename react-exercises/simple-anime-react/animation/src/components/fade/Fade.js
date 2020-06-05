import React from 'react';
import './Fade.css'

const Fade = (props) => {
    return (
        <React.Fragment>
            <div style={{ animation: 'fadein 3s linear 1s 1 alternate' }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Fade;
