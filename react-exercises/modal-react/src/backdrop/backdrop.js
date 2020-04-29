import React from 'react';
import './backdrop.css';

const backdrop = props => <div className="backdrop" onClick={props.onCancel}></div>

export default backdrop;