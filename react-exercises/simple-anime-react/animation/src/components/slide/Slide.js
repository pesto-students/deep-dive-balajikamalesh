import React from "react";
import "./Slide.css";

const Slide = (props) => {
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
    const animationsList = ["slideDown", "slideUp", 'slideRight'];
    const animationType = animationsList.includes(props.animationType)
        ? props.animationType
        : "slideDown";
    const delay = props.delay ? `${props.delay}s` : '1s';
    const duration = props.duration ? `${props.duration}s` : '2s';
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
