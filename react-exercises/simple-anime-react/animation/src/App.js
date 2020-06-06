import React from 'react';
import './App.css';
import Slide from './components/slide/Slide';
import Fade from './components/fade/Fade';
import Pulse from './components/pulse/pulse';
import Bounce from './components/bounce/bounce';

function App() {
  return (
    <div className="App">
      {/* <div className="slide">
        <div className="parent-content">
          <Slide type="slideRight" duration="2" iterate="infinite" delay="1">
            <div className="child-content">Slide Right</div>
          </Slide>
        </div>

        <div className="parent-content">
          <Slide type="slideDown" duration="2" iterate="infinite" delay="1">
            <div className="child-content">Slide Down</div>
          </Slide>
        </div>

        <div className="parent-content" style={{ marginTop: '40%' }}>
          <Slide type="slideUp" duration="2" iterate="infinite" delay="1">
            <div className="child-content">Slide Up</div>
          </Slide>
        </div>
      </div>

      <div className="slide">
        <div className="" style={{ marginTop: '40%' }}>
          <Fade type="fadeout" duration="2" iterate="infinite" delay="1">
            <div className="child-content">Fade Out 🤩</div>
          </Fade>
        </div>
        <div className="" style={{ marginTop: '40%' }}>
          <Fade duration="2" iterate="infinite" delay="1">
            <div className="child-content">Fade In🤩</div>
          </Fade>
        </div>

      </div> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <div style={{ paddingTop: '200px' }}>
        <Pulse duration={1}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQx6pw6WDj0Sj9lesiCH5Rx9gvQzfY1ZZmO1esPf41sOzK0Nn8d&usqp=CAU" />
        </Pulse>
      </div> */}
      <div style={{ paddingTop: '200px' }}>
        <Bounce duration={1} decay={false}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png" alt="simley" />
        </Bounce>
      </div>
    </div>
  );
}

export default App;

