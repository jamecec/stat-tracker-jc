import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import UserForm from "./Components/Forms/UserForm.js";
import StatForm from "./Components/Forms/StatForm.js";
import GoalForm from "./Components/Forms/GoalForm.js";
import GraphForm from "./Components/Forms/GraphForm.js";

const App = () =>{
  return(
    <React.Fragment>
    <div className="container">
        <h1>FPS Stat Tracker</h1>
        <div className="layout">
          <div className ="forms-column">
          <UserForm/>
          <StatForm/>
          <GoalForm/>
          </div>
          <div className = "graph-column">
          <GraphForm/>
          </div>
          </div>
        </div>
    </React.Fragment>
  )
};
export default App;
