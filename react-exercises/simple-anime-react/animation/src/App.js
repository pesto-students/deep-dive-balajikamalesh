import React from 'react';
import './App.css';
import Slide from './components/slide/Slide';
import Fade from './components/fade/Fade';

function App() {
  return (
    <div className="App">
      <div style={{ height: '50%' }}>
        <Slide animationType="slidein" duration="2s" iterate="1" delay="1s">
          <div>check</div>
        </Slide>
      </div>
      <Fade>
        <div>check</div>
      </Fade>
    </div>
  );
}

export default App;
