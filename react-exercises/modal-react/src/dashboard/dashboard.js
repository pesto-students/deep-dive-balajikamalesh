import React from 'react';
import './dashboard.css';
import { navigate } from '@reach/router';

export default (props) => {
  return(
    <div>
      <div className="dashboard">
          <button className="button" onClick={() => navigate('/')}>Logout</button>
      </div>
      <div className="sidebar">
      </div>
    </div>
  )
}