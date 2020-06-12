import React from 'react';

export default (props) => {
  return (
    <div style={{marginTop: '40px',textAlign: 'center'}}>
      <h1>Difficulty Level</h1>
      <form>
        <div className="radio-toolbar">
            <input type="radio" id="easy" onClick={() => props.handler('easy')} name="difficulty" />
            <label htmlFor="easy">Easy</label>
            <input type="radio" id="medium" onClick={() => props.handler('medium')} name="difficulty" />
            <label htmlFor="easy">Medium</label>
            <input type="radio" id="hard" onClick={() => props.handler('hard')} name="difficulty" />
            <label htmlFor="easy"><span></span>Hard</label>
            <input type="radio" id="pesto" onClick={() => props.handler('pesto')} name="difficulty" />
            <label htmlFor="easy"><span></span>PESTO</label>
        </div>
      </form>
    </div>
  )
}