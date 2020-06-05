import React from 'react';
import './App.css';
import Slide from './components/slide/Slide';
import Fade from './components/fade/Fade';

function App() {
  return (
    <div className="App">
      <Slide>
        <div>check</div>
      </Slide>
      <Fade>
        <div>check</div>
      </Fade>
    </div>
  );
}

export default App;
