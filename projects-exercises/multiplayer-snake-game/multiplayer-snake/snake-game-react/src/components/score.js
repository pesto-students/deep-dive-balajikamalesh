import React from 'react';

export default (props) => {
  return (
    <div>
      <h1>High Score: {
                (props.speed === 1) ? props.highScore.easy : 
                (props.speed === 2 ? props.highScore.medium : (props.speed === 3 ? props.highScore.hard: props.highScore.PESTO )) 
              
              } </h1>
      <h1>Score: {props.currentScore} </h1>
    </div>
  )
}