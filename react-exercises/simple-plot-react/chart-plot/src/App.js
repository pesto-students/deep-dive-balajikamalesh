import React from 'react';
import Chart from './component/chart/chart';
import './App.css';

function App() {
  return (
    <div>
      <h1>My Chart Library</h1>
      <br/>
      <Chart type="bar" 
             title="Bar plot"
             data={[10, 20, 30, 40, 40, 50, 60, 70, 80, 40, 30, 20, 10, 10, 20, 30, 40, 40, 50, 60, 70, 80, 40, 30, 20, 10]}
             />
      <br/>
      <br/>
      <br/>
      <Chart type="bar" 
             title="Bar plot"
             data={[100, 20, 30, 40, 40, 50, 60, 70, 80, 40, 30, 20, 10]}
             />
      <br/>
      <br/>
      <br/>
      <Chart type="bar" 
             title="Bar plot"
             data={[...Array(300).keys()].sort(function() {
              return .5 - Math.random();
            })}
             />
      <br/>
      <br/>
      <br/>
      <Chart type="line" 
             title="Line Plot"
             color="blue"
             lineWidth={3}
             data={[[10,20], [20,30], [30, 20], [40,60], [50,5], [60,30], [70,25], [80, 50], [90, 40], [100, 10]]}/>
      <br/>
      <br/>
      <br/>
      <Chart type="line" 
             title="Line Plot"
             color="brown"
             lineWidth={10}
             data={[[10,10], [20,40], [30, 10], [40,40], [50,70], [60,2], [70,15], [80, 45], [90, 65], [100, 50]]}/>
    </div>
  );
}

export default App;
