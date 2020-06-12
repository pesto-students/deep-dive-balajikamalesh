import React from 'react';

export default (props) => {
  return (
    <div style={{marginTop: '40px'}}>
      <h1>Instructions</h1>
      <ol>
        <li>Use arrow keys (TOP, BOTTOM, LEFT, RIGHT) to control the snake</li>
        <li>Avoid the purple colored obstacles</li>
        <li>To restart game, select difficulty level and click on 'Reset'</li>
      </ol>
    </div>
  )
}