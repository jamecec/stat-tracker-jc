import React, {useState, useEffect, useRef} from 'react';
import VerticalProgress from "../Graphs/VerticalProgress.js";

export default function GoalForm(){
  const [goalAccordion, setGoalAccordion] = useState(false);
  const [goalGame, setGoalGame] = useState();
  const [goalId, setGoalId] = useState();
  const [goalDmg, setGoalDmg] = useState();
  const [goalKills, setGoalKills] = useState();
  const [goalResponse, setGoalResponse] = useState();
  const [goalStatus, setGoalStatus] = useState();


  const filteredGoalData = goalResponse? goalResponse.filter(d=> d.game == goalGame) : [];
  const currDmg = goalResponse? Math.round((filteredGoalData.reduce((total,next)=> total + next.damage,0)/filteredGoalData.length)) : 0;
  const currKills = goalResponse? Math.round((filteredGoalData.reduce((total,next)=> total + next.kills,0)/filteredGoalData.length)) : 0;
  const dmgRatio = currDmg/goalDmg> 1? 100 : (currDmg/goalDmg)*100;
  const killsRatio = currKills/goalKills> 1? 100 : (currKills/goalKills)*100;

  let updateGoals = (e) => {
    e.preventDefault();
    if (!goalId){
      setGoalStatus("Please input your ID")
    }
    else if(!goalDmg || !goalKills || !goalGame){
      setGoalStatus("Please Input your Goals")
    }
    else{
   fetch(`https://stat-tracker-jc.herokuapp.com/api/stats/${goalId}`)
   .then(response=>response.json())
   .then(data=> setGoalResponse(JSON.parse(data)))
   setGoalStatus()
}
 };
    function example1(){
      setGoalId(1);
      setGoalGame("Apex Legends");
      setGoalDmg(3000);
      setGoalKills(6);
    }
    function example2(){
      setGoalId(1);
      setGoalGame("Overwatch");
      setGoalDmg(8000);
      setGoalKills(20);
    }
  const goalAccordionContent = (
    <div className = "goals">
      <div className="goalSet">
      <span className = "examples" onClick={example1}>Click for Example 1 then Click Update Goals</span>
      <br/>
      <br/>
      <span className = "examples" onClick={example2}>Click for Example 2 then Click Update Goals</span>
      <p>User Id</p>
      <input name="goalid" placeholder="User Id" type="text" id="goalid" onChange={(e)=> setGoalId(e.target.value)} value = {goalId}/>
      <p>Game</p>
      <input name="goalGame" placeholder="Game" type="text" id="goalGame" onChange={(e)=> setGoalGame(e.target.value)} value = {goalGame}/>
      <p className="dmg">Goal: Average Damage Per Game</p>
      <input name="goalDamage" placeholder="Damage Goal" type="number" id="goalDamage" onChange={(e)=> setGoalDmg(e.target.value)} value = {goalDmg}/>
      <p className="kills">Goal: Average Kills Per Game</p>
      <input name="killGoal" placeholder="Kill Goal" type="number" id="killGoal" onChange={(e)=> setGoalKills(e.target.value)} value = {goalKills}/>
      <br/>
      <button className="goalBtn" onClick = {updateGoals}>Update Goals</button>
      <div id="goalResponse">{goalStatus}</div>
      </div>
      <div className="progress-bars">
      <VerticalProgress bgcolor='#b3332f' progress={dmgRatio} width={40} label="DMG" numLabel={currDmg}/>
      <VerticalProgress bgcolor='#6652a7' progress={killsRatio} width={40} label="KILLS" numLabel={currKills}/>
      </div>
      </div>);

  return(
    <div className="accordion">
    <div className="accordion-item">
    <div
    className="accordion-title"
    onClick={() => setGoalAccordion(!goalAccordion)}
    >
    <div>Goal Progress</div>
    <div className = "icon">{goalAccordion? '-' : '+'}</div>
    </div>
    {goalAccordion && <div className="accordion-content">{goalAccordionContent}</div>}
    </div>
    </div>
  )

}
