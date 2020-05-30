import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from "@reach/router";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

ReactDOM.render(
  <Router>
    <SignUp path="/" default/>
    <SignIn path="/signin" />
    <App path="/todo"/>
   </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
