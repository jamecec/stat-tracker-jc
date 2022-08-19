import React, {useState, useEffect, useRef} from 'react';
import BarChart from "../Graphs/BarChart";

export default function GraphForm(){
  const [graphId, setGraphId] = useState("");
  const [gameFilter, setGameFilter] = useState("");
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [graphResponse, setGraphResponse] = useState();
  const [graphStatus, setGraphStatus] = useState();
  const isMounted = useRef(false);

  let generateGraph = (e) => {
    e.preventDefault();
    if (!graphId){
      setGraphStatus("Please input your ID")
    }
    else if(!x || !y || !gameFilter){
      setGraphStatus("Please Make a Selection")
    }
    else{
   fetch(`https://stat-tracker-jc.herokuapp.com/api/stats/${graphId}`)
   .then(response => response.json())
   .then(data => setGraphResponse(data));
   setGraphStatus();
}
 };

function example1(){
  setGraphId(1);
  setGameFilter("Apex Legends");
}
function example2(){
  setGraphId(1);
  setGameFilter("Overwatch");
}

  return(
    <div className = "graph-selector">
    <h2>Stat Graph</h2>
    <span className = "examples" onClick={example1}>Click for Example 1, Make Selection, then Generate Graph</span>
    <br/>
    <span className = "examples" onClick={example2}>Click for Example 2, Make Selection, then Generate Graph</span>
    <div className="graph-options">
    <p>Id</p>
    <input name="graphId" placeholder="Id" type="text" id="graphId" value = {graphId} onChange={(e)=> setGraphId(e.target.value)} value = {graphId}/>
    <p>Game:</p>
    <input name="gameFilter" placeholder="Game" type="text" id="gameFilter" value = {gameFilter} onChange={(e)=> setGameFilter(e.target.value)} value = {gameFilter}/>
    <label htmlFor="graphSelection">Choose a Graph:</label>
    <select name="ySelection" id="ySelection" defaultValue="" onChange={(e)=> setY(e.target.value)}>
    <option value="" disabled hidden>Please Select</option>
    <option value="damage">Average Damage per Game</option>
    <option value="kills">Average Kills per Game</option>
    <option value="assists">Average Assist per Game</option>
    </select>
    <div>by</div>
    <select name="xSelection" id="xSelection" defaultValue="" onChange={(e)=> setX(e.target.value)}>
    <option value="" disabled hidden>Please Select</option>
    <option value="date">Day</option>
    <option value="loadout">Loadout</option>
    <option value="character">Character</option>
    </select>
    <button className="graphButton" onClick={generateGraph}>Generate Graph</button>
    <div>{graphStatus}</div>
    </div>
    <div className = "graph-display">
    {graphResponse && <BarChart data={JSON.parse(graphResponse)} x={x} y = {y} filter= {gameFilter}/>}
    </div>
    </div>
  )
}
