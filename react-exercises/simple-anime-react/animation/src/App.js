import React from 'react';
import './App.css';
import Slide from './components/slide/Slide';
import Fade from './components/fade/Fade';

function App() {
  return (
    <div className="App">
      <div className="parent-content">
        <Slide animationType="slideRight" duration="2" iterate="infinite" delay="1">
          <div className="child-content">Slide Right</div>
        </Slide>
      </div>

      <div className="parent-content">
        <Slide animationType="slideDown" duration="2" iterate="infinite" delay="1">
          <div className="child-content">Slide Down</div>
        </Slide>
      </div>

      <div className="parent-content" style={{ marginTop: '15%' }}>
        <Slide animationType="slideUp" duration="2" iterate="infinite" delay="1">
          <div className="child-content">Slide Up</div>
        </Slide>
      </div>

      <Fade animationType="fadeout">
        <div>Fade Out</div>
      </Fade>
      <Fade>
        <div>Fade In</div>
      </Fade>
    </div>
  );
}

export default App;
