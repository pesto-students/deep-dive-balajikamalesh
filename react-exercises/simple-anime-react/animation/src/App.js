import React from 'react';
import './App.css';
import Slide from './components/slide/Slide';
import Fade from './components/fade/Fade';

function App() {
  return (
    <div className="App">
      <div style={{ height: '50%' }}>
        <Slide animationType="slideinLeft" duration="2" iterate="1" delay="1">
          <div>Slide</div>
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
