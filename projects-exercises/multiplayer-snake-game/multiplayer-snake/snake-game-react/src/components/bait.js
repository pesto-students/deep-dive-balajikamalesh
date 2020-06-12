import React from 'react';

export default (props) => {

  const style = {
    top: `${props.dot[0]}%`,
    left: `${props.dot[1]}%`
  }  

  if(props.isNear){
    return (
      <div className="snake-bait" style={style} data-tooltip="AGHHH!!! DON'T EAT ME!!!"></div>
    )
  } else {
    return (
      <div className="snake-bait-far" style={style}></div>
    )
  }
}