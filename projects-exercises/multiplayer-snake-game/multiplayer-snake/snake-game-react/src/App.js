import React , {useState, useEffect} from 'react';
import './App.css';
import Snake from './components/snake';
import Bait from './components/bait';
import Obstacles1 from './components/obstable';
import Obstacles2 from './components/obstable';
import Obstacles3 from './components/obstable';
import Obstacles4 from './components/obstable';
import Obstacles5 from './components/obstable';
import Score from './components/score';
import DifficultyLevel from './components/difficultylevel';
import Instructions from './components/instructions';
import Gameover from './components/gameover';
import pointSound from './sound/smb_coin.wav';
import gameOverSound from './sound/smb_mariodie.wav';


const getRandomPositionForBait = () => {
  let min = 1, max = 98;
  let x = Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
  let y = Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
  return [x, y];
}

const getObstaclesPositions = () => {
  let min = 6, max = 94;
  let x = Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
  let y = Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
  return Math.random() > 0.5 ? [[x,y],[x+1,y],[x+2,y],[x+3,y],[x+4,y],[x+5,y]] : 
                               [[x,y],[x,y+1],[x,y+2],[x,y+3],[x,y+4],[x,y+5]]; 
}

function App() {
  
  const [bait, setBait] = useState(getRandomPositionForBait()); 
  const [obstacles1, setObstacles1] = useState(getObstaclesPositions());
  const [obstacles2, setObstacles2] = useState(getObstaclesPositions());
  const [obstacles3, setObstacles3] = useState(getObstaclesPositions());
  const [obstacles4, setObstacles4] = useState(getObstaclesPositions());
  const [obstacles5, setObstacles5] = useState(getObstaclesPositions());
  const [speed, setSpeed] = useState(2);
  const [direction, setDirection] = useState('R');
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState('');
  const [isNear, setIsNear] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState({'easy': 0,'medium': 0,'hard': 0,'PESTO': 0});
  const [snake, setSnake] = useState([...Array(5).keys()].map(x => [0, 2*x]));

  useEffect(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() { 
      window.scrollTo(scrollLeft, scrollTop); 
    }; 

    document.onkeydown = debounce(onKeyDown, 200/speed);
    if(speed !== 0 && !isGameOver){
      window.myTimer = setInterval(moveSnake, (200/speed));
    }

    let headOfSnake = snake[snake.length - 1];
    if((headOfSnake[0] > 98 || headOfSnake[1] > 98 || headOfSnake[0] < 0 || headOfSnake[1] < 0) && !isGameOver){
      gameOver('Boundary Collision!!!');
    }

    return () => clearInterval(window.myTimer);  
  },[direction, isGameOver, speed, moveSnake, onKeyDown, snake])

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

  function moveSnake() {
    let snakeArray = [...snake];
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

        if(JSON.stringify(obstacles1).indexOf(JSON.stringify(headOfSnake)) >= 0
          || JSON.stringify(obstacles2).indexOf(JSON.stringify(headOfSnake)) >= 0
          || JSON.stringify(obstacles3).indexOf(JSON.stringify(headOfSnake)) >= 0
          || JSON.stringify(obstacles4).indexOf(JSON.stringify(headOfSnake)) >= 0
          || JSON.stringify(obstacles5).indexOf(JSON.stringify(headOfSnake)) >= 0){
          gameOver('Obstacle Collision!!!');
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
      if(bait[0] === headOfSnake[0] && bait[1] === headOfSnake[1]) {
        document.getElementById('pointSound').play();
        snakeArray.push(headOfSnake);
        setSnake(snakeArray);
        setBait(getRandomPositionForBait());
        setScore(score + 1);
        if(speed === 1)
          setHighScore({...highScore , easy: Math.max(highScore['easy'], score + 1)});
        else if(speed === 2)
          setHighScore({...highScore , medium: Math.max(highScore['medium'], score + 1)});
        else if(speed === 3)
          setHighScore({...highScore , hard: Math.max(highScore['hard'], score + 1)});
        else
          setHighScore({...highScore , PESTO: Math.max(highScore['PESTO'], score + 1)});
      }

      setSnake(snakeArray);
  }

  function setSpeedofSnake(difficulty) {
      switch(difficulty){
        case 'easy':
          setSpeed(1);
          break;
        case 'medium':
          setSpeed(2);
          break;
        case 'hard':
          setSpeed(3);
          break;
        case 'pesto':
          setSpeed(6);
          break;
        default:
          break;
      }
  }

  function gameOver(reason) {
    clearInterval(window.myTimer);
    setIsGameOver(true);
    setGameOverReason(reason)
    let gameOverSound = document.getElementById('gameOverSound');
    gameOverSound.volume = 0.5;
    gameOverSound.play();
  } 

  function reset(){
    setBait(getRandomPositionForBait());
    setSnake([...Array(5).keys()].map(x => [0, 2*x]));
    setDirection('R');
    setIsGameOver(false);
    setIsNear(false);
    setScore(0);
    setObstacles1(getObstaclesPositions());
    setObstacles2(getObstaclesPositions());
    setObstacles3(getObstaclesPositions());
    setObstacles4(getObstaclesPositions());
    setObstacles5(getObstaclesPositions());
  }

    return (
      <div>
        <audio id="pointSound" src={pointSound} preload="auto"></audio>
        <audio id="gameOverSound" src={gameOverSound} preload="auto"></audio>
        <h1>SNAKE MANIA</h1>
        <div className="game-layout">
          <Snake snakeSquares={snake} />
          <Obstacles1 positions={obstacles1}/>
          <Obstacles2 positions={obstacles2}/>
          <Obstacles3 positions={obstacles3}/>
          <Obstacles4 positions={obstacles4}/>
          <Obstacles5 positions={obstacles5}/>
          <Bait dot={bait} isNear={isNear}/> 
        </div>
        <div className="information">
          <Score currentScore={score} highScore={highScore} speed={speed}/>
          <DifficultyLevel handler={setSpeedofSnake}/>
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
