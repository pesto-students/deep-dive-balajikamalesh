import React from "react";
import "./Slide.css";

const Slide = (props) => {
    const animationsList = ["slidein", "slideout"];
    const animationType = animationsList.includes(props.animationType)
        ? props.animationType
        : "slidein";
    const delay = props.delay ? props.delay : '1s';
    const duration = props.duration ? props.duration : '2s';
    const iterate = props.iterate ? props.iterate : '1';
    const timimgFn = props.timimgFn ? props.timimgFn : 'ease';

    return (
        <React.Fragment>
            <div
                style={{
                    animation: `${animationType} ${duration} ${timimgFn} ${delay} forwards ${iterate}`,
                    height: "100%",
                    width: "100%",
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default Slide;
