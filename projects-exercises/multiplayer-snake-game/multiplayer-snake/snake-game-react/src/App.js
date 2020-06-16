import React , { useState, useEffect } from 'react';
import './App.css';
import Snake from './components/snake';
import Bait from './components/bait';
import Score from './components/score';
import Instructions from './components/instructions';
import Gameover from './components/gameover';

import io from 'socket.io-client';
let socket;
socket = io('localhost:5000');

function App() {
  
  const [bait, setBait] = useState([0,0]); 
  const [uniqid, setUniqueid] = useState('');
  const [speed, setSpeed] = useState(2);
  const [direction, setDirection] = useState('R');
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState('');
  const [isNear, setIsNear] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState({'easy': 0,'medium': 0,'hard': 0,'PESTO': 0});

  const [snakes, setSnakes] = useState([]);
  const [snakeColors, setSnakeColors] = useState([]);
  const [snakeDirections, setSnakeDirections] = useState(['R']);

  useEffect(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() { 
      window.scrollTo(scrollLeft, scrollTop); 
    }; 

    document.onkeydown = debounce(onKeyDown, 200/speed);

    // if(speed !== 0 && !isGameOver){
      snakes.forEach((snake,i) => {
        if(window[`myTimer${i}`] == undefined){
          window[`myTimer${i}`] = setInterval(moveSnake, (1800/speed),...[snake,i]);
        }
      })
      
    // 

    // let headOfSnake = snake[snake.length - 1];

    // if((headOfSnake[0] > 98 || headOfSnake[1] > 98 || headOfSnake[0] < 0 || headOfSnake[1] < 0) && !isGameOver){
    //   gameOver('Boundary Collision!!!');
    // }

    // return () => clearInterval(window.myTimer);  
  },[bait, direction, isGameOver, speed, snakes, onKeyDown])

  function debounce(func, delay) {
    var timer = null;
    return function () {
      var context = this, 
      args = arguments;
      clearTimeout(timer);
        timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  socket.on('snakeCreated', (data) => {
    setSnakes(data.snakes);
    setSnakeColors(data.snakesColor);
    setBait(data.bait);
    setUniqueid(data.id);
  })

  function onKeyDown(event) {
    if(event.keyCode === 38 && direction !== 'D')
      setDirection('U');  
    if(event.keyCode === 39 && direction !== 'L')
      setDirection('R');
    if(event.keyCode === 40 && direction !== 'U')
      setDirection('D');  
    if(event.keyCode === 37 && direction !== 'R') 
      setDirection('L'); 
  }

  function moveSnake(snake, index) {
    if(snake !== undefined && index !== undefined){
      let snakeArray = snake.snake;
      let headOfSnake = snakeArray[snakeArray.length - 1];
        if(direction === 'R')
          headOfSnake = [headOfSnake[0] ,headOfSnake[1] + 2];
        else if(direction === 'L')
          headOfSnake = [headOfSnake[0] ,headOfSnake[1] - 2];
        else if(direction === 'D')
          headOfSnake = [headOfSnake[0] + 2,headOfSnake[1]];
        else
          headOfSnake = [headOfSnake[0] - 2,headOfSnake[1]];

          //self collision
          if(JSON.stringify(snakeArray).indexOf(JSON.stringify(headOfSnake)) >= 0){
              gameOver('Self Collision!!!');
          }

          snakeArray.push(headOfSnake);
          snakeArray.shift();

        if((Math.abs(bait[0] - headOfSnake[0]) < 15) 
            && (Math.abs(bait[1] - headOfSnake[1]) < 15)) {
          setIsNear(true)
        } else {
          setIsNear(false)
        }
    

      //found
      // if(bait[0] === headOfSnake[0] && bait[1] === headOfSnake[1]) {
      //   snakeArray.push(headOfSnake);
      //   setSnake(snakeArray);
      //   setBait(getRandomPositionForBait());
      //   setScore(score + 1);
      //   if(speed === 1)
      //     setHighScore({...highScore , easy: Math.max(highScore['easy'], score + 1)});
      //   else if(speed === 2)
      //     setHighScore({...highScore , medium: Math.max(highScore['medium'], score + 1)});
      //   else if(speed === 3)
      //     setHighScore({...highScore , hard: Math.max(highScore['hard'], score + 1)});
      //   else
      //     setHighScore({...highScore , PESTO: Math.max(highScore['PESTO'], score + 1)});
      // }
      let x = snakes.map((sna,i) => {
        if(i == index){
          sna.snake = snakeArray;
        }
        return sna;
      })
      setSnakes(x);
    }
  }

  function gameOver(reason) {
    clearInterval(window.myTimer);
    setIsGameOver(true);
    setGameOverReason(reason)
  } 

  function reset(){
    // setBait(getRandomPositionForBait());
    // setSnake([...Array(5).keys()].map(x => [0, 2*x]));
    setDirection('R');
    setIsGameOver(false);
    setIsNear(false);
    setScore(0);
  }

  return (
      <div>
        <h1>SNAKE MANIA</h1>
        <div className="game-layout">
          {
            snakes.map((snake,i)=> {
              return (
                <Snake snakeSquares={snake.snake} key={i} color={snakeColors[i]}/>
              )
            })
          }
          <Bait dot={bait} isNear={isNear}/> 
        </div>
        <div className="information">
          <Score currentScore={score} highScore={highScore} speed={speed}/>
          <div style={{marginLeft: '200px'}}>
            <button onClick={() => reset()}>Reset</button>
          </div>
          <Instructions />
          <Gameover isGameOver={isGameOver} reason={gameOverReason}/>
        </div>
      </div>
    );
}

export default App;
