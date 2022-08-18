import React, {useState, useEffect, useRef} from 'react';

export default function StatForm(){
  const [statAccordion, setStatAccordion] = useState(false);
  const [statId, setStatId] = useState("");
  const [game, setGame] = useState("");
  const [character, setCharacter] = useState("");
  const [loadout1, setLoadout1] = useState("Empty slot");
  const [loadout2, setLoadout2] = useState("Empty slot");
  const [damage, setDamage] = useState(0);
  const [kills, setKills] = useState(0);
  const [assists, setAssists] = useState(0);
  const [statResponse, setStatResponse] = useState();
  const [statStatus, setStatStatus] = useState();
  const loadout = loadout1 + " & " + loadout2;

  function baseState(){
    setStatId("");
    setGame("");
    setCharacter("");
    setLoadout1("Empty Slot");
    setLoadout2("Empty Slot");
    setDamage(0);
    setKills(0);
    setAssists(0);
    setStatStatus();
  }

  let handleStatSubmit = (e) => {
    e.preventDefault();
    if (statId == "" || game == ""){
      setStatStatus("ID and Game are required fields")
    }
    else{
   fetch(`https://git.heroku.com/stat-tracker-jc.git/api/stats/${statId}`, {
     method: 'post',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       id: statId,
       game: game,
       character: character,
       loadout: loadout,
       damage: damage,
       kills: kills,
       assists: assists,
       statdate: new Date()
     })
   })
   .then(response=>response.json())
   .then(data=> setStatResponse(data))
   baseState();
 }};

 const statAccordionContent = (
   <div>
   <form onSubmit={handleStatSubmit}>
     <div className="recordStats">
     <p>User Id</p>
     <input name="statId" placeholder="User Id" type="text" id="statId" onChange={(e)=> setStatId(e.target.value)} value={statId} />
     <p>Game</p>
     <input name="game" placeholder="Game Played" type="text" id="game" onChange={(e)=> setGame(e.target.value)} value={game}/>
     <p>Character</p>
     <input name="character" placeholder="Character Played" type="text" id="character" onChange={(e)=> setCharacter(e.target.value)} value={character}/>
     <p>Main Loadout</p>
     <input name="loadout1" placeholder="Weapon 1" type="text" id="loadout1" onChange={(e)=> setLoadout1(e.target.value)} value={loadout1}/>
     <input name="loadout2" placeholder="Weapon 2" type="text" id="loadout2" onChange={(e)=> setLoadout2(e.target.value)} value={loadout2}/>
     <p>Damage</p>
     <input name="damage" placeholder="Damage" type="number" id="damage" onChange={(e)=> setDamage(e.target.value)} value={damage}/>
     <p>Kills</p>
     <input name="kills" placeholder="Kills" type="number" id="kills" onChange={(e)=> setKills(e.target.value)} value={kills}/>
     <p>Assists</p>
     <input name="assists" placeholder="Assists" type="number" id="assists" onChange={(e)=> setAssists(e.target.value)} value={assists}/>
     <br/>
     <input type="submit" value="Record Match Stats" className = "recButton"/>
     </div>
     <div id="statResponse">{statStatus}</div>
     <div id="statResponse">{statResponse}</div>
   </form>
   </div>);

   return(
     <div className="accordion">
     <div className="accordion-item">
       <div
       className="accordion-title"
       onClick={() => setStatAccordion(!statAccordion)}
       >
       <div>Record a Stat</div>
       <div className = "icon">{statAccordion? '-' : '+'}</div>
       </div>
       {statAccordion && <div className="accordion-content">{statAccordionContent}</div>}
       </div>
       </div>
   )

}
