import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import "./index.css";
import App from "./App";
import Dashboard from './dashboard/dashboard';

ReactDOM.render(
  <Router>
    <App path="/"/>
    <Dashboard path="/dashboard" />
   </Router>,
  document.getElementById("root")
);
