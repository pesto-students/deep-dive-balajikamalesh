import React from 'react';
import Bar from './bar';
import Line from './line';

export default (prop) => {
  if(prop.type === 'bar'){
    return <Bar title={prop.title} data={prop.data}/>;
  } else if(prop.type === 'line') {
    return <Line title={prop.title} data={prop.data} color={prop.color} lineWidth={prop.lineWidth}/>;
  }
}
