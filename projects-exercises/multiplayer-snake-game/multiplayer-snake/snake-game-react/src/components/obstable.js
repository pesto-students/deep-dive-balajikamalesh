import React from 'react';

export default (props) => {
  return(
    <div>
      {props.positions.map((dot, i) => {
            const style = {
              top: `${dot[0]}%`,
              left: `${dot[1]}%`
            }
              return (
                <div className="obstacle" key={i} style={style}></div>
              )
      })}
    </div>
  )
}