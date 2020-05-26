import React, { useState, useRef, useEffect } from 'react';
import './line.css';

export default (prop) => {
    const [points, setLocations] = useState(prop.data);
    const [scale, setScale] = useState(12);
    const canvasRef = useRef(null);

    useEffect(() => {
      // setScale( (Math.max(...points.flat())/window.innerHeight)*10  );
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.font = "20px Georgia";
      context.clearRect(0, 0, window.innerHeight, window.innerWidth);

      //set origin to bottom-left
      context.translate(0, canvas.height);
      context.scale(1, -1);
      
      context.beginPath();
      context.moveTo(0,0);
      points.forEach(point => {
        const [X, Y] = point;
        context.lineTo(X*scale, Y*scale);
        context.fillText(`(${X},${Y})`, X*scale + 1, Y*scale + 1);
        context.arc(X*scale, Y*scale, 3, 0, 2 * Math.PI)
      })
      context.lineWidth = prop.lineWidth ? prop.lineWidth : 5;
      context.strokeStyle = prop.color ? prop.color : 'black';
      context.stroke();
    })

    return (
      <div id="canvas-container">
        <h3>{prop.title}</h3>
        <canvas 
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
}
