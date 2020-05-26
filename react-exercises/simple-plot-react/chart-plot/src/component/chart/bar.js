import React, {useState} from 'react';
import './bar.css';

export default (prop) => {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

    const [dataSet, setDateSet] = useState(prop.data);
    const [colorSet, setColorSet] = useState(Array.from(new Set(dataSet)).map(function(val){
                                                return {'value': val, 'color': getRandomColor()};
                                            }));

    return (
        <div className="bar-container">
          <h3>
            {prop.title}
            {/* {colorSet.map(color => {
              return <div style={{backgroundColor: color.color,float: "right"}} 
                          className="square">{color.value}</div>;
            })} */}
          </h3>
              {
                  dataSet.map((data, index) => {
                              const value = data;
                              let height, width, transform,color;

                              color = colorSet.find(data => data.value == value).color;
                              
                              if(dataSet.length < 100)
                                height = `${value * 3}px`;
                              else if(dataSet.length >= 100 && dataSet.length < 200)
                                height = `${value * 1.35}px`;
                              else if(dataSet.length >= 200 && dataSet.length < 300)
                                height = `${value * 0.9}px`;
                              else if(dataSet.length >= 300 && dataSet.length < 400)
                                height = `${value * 0.6}px`;
                              else if(dataSet.length >= 400)
                                height = `${value * 0.5}px`;
                      
                              width = `${900/(dataSet.length)}px`;
                              transform = `translateX(${index * 1200/(dataSet.length)}px)`;

                              const block = React.createElement("div", { style:{width: width,height: height,transform: transform, backgroundColor: color}, className: "block" });

                              return(
                                  block
                              )
                  })
              }
        </div> 
    );
}
