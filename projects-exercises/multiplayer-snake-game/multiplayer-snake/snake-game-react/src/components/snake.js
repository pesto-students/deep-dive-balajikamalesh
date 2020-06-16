import React from 'react';

export default (props) => {
  return (
    <div>
      {props.snakeSquares.map((dot, i) => {
            const style = {
              top: `${dot[0]}%`,
              left: `${dot[1]}%`,
            }
            const bodystyle = {...style, backgroundColor: `${props.color}`}
            if(i === props.snakeSquares.length - 1){
              return (
                <div className="snake-head" key={i} style={style}></div>
              )
            } else {
              if(i%2 === 0) {
                return (
                  <div className="snake-body-1" key={i} style={bodystyle}></div>
                )
              } else {
                return (
                  <div className="snake-body-2" key={i} style={bodystyle}></div>
                )
              }
            }
      })}
    </div>
  )
}