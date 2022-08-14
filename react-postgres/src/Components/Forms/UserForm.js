import React, {useState, useEffect, useRef} from 'react';

export default function UserForm(){
  const [userAccordion, setUserAccordion] = useState(false);
  const [user, setUser] = useState(null);
  const [userResponse, setUserResponse] = useState();
  const [userId, setUserId] = useState(null);

  let handleUserSubmit = (e) => {
    e.preventDefault();
     fetch('http://localhost:5000/api/users', {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         username: user
       })
     })
     .then(response=>response.json())
     .then(data=> setUserResponse(data))
   };

  const userAccordionContent =  (
    <div>
     <form onSubmit={handleUserSubmit}>
     <div className="new-user">
     <p className="username">Username:</p>
     <input name="user" placeholder="Username" type="text" id="user" onChange={(e)=> setUser(e.target.value)}/>
     <input type="submit" value="Submit"/>
     </div>
     <div id="userResponse">{userResponse}</div>
     </form>
     </div>
   );
     return(
          <div className="accordion">
      <div className="accordion-item">
      <div
        className="accordion-title"
        onClick={() => setUserAccordion(!userAccordion)}
      >
        <div>Add a New User</div>
        <div className = "icon">{userAccordion? '-' : '+'}</div>
      </div>
      {userAccordion && <div className="accordion-content">{userAccordionContent}</div>}
      </div>
      </div>
  )
}
