import React, { useEffect } from 'react';
import './bounce.css';

export default (props) => {
    useEffect(() => {
        var bounce = document.getElementsByClassName('bounce')[0];
        if(bounce !== undefined){
            var ypos, start, time;
            (function drawPosition(timestamp) {
                if (!start) { 
                    start = timestamp 
                };
                
                time = (timestamp - start);
                
                if(props.decay){
                    ypos = (-.000483932 * Math.pow(((time + 575) % 1150 - 575), 2) + 160) * (10000/time);
                } else {
                    ypos = (-.000483932 * Math.pow(((time + 575) % 1150 - 575), 2) + 160)
                }
            
                bounce.style.transform = 'translateY(' + -ypos + 'px)';
                window.requestAnimationFrame(drawPosition);
            })(performance.now());
        }
      })

    return (
        <div className="bounce">
            {props.children}    
        </div>
    )

}

// export default bounce;
