import React from "react";
import "./pulse.css";

const pulse = (props) => {
    return (
        <React.Fragment>
            <div className="pulse" style={{animationName: 'pulse',animationDuration: `${props.duration}s`}}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default pulse;
