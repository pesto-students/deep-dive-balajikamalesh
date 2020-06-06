import React from 'react';
import './App.css';
import Slide from './components/slide/Slide';
import Fade from './components/fade/Fade';

function App() {
  return (
    <div className="App">
      <div style={{ height: '50%' }}>
        <Slide animationType="slidein" duration="2s" iterate="infinite" delay="1s">
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
