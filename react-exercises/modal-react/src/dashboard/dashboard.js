import React from 'react';
import './dashboard.css';
import { navigate } from '@reach/router';

export default (props) => {
  if(!props.location.state){
    navigate(-1);
  } else{
    return(
      <div>
        <div className="dashboard">
            <button className="button" onClick={() => navigate('/', { state: { fromApp: true }})}>Logout</button>
        </div>
      </div>
    )
  }
}
