import React from "react";
import "./pulse.css";

const pulse = (props) => {
    debugger;

    let duration = props.duration == undefined ? '1' : props.duration;
    let iterationCount = props.iterationCount == undefined ? 'infinite' : props.iterationCount;
    return (
        <React.Fragment>
            <div className="pulse" style={{animationName: 'pulse',
                                            animationDuration: `${duration}s`
                                            ,'animation-iteration-count': `${iterationCount}`}}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default pulse;
