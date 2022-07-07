import React, { useEffect } from 'react';
import './tabs.css';


function Tabs({parentCallback, searchData}) {
    
  // Using the callback function to send props in the opposite direction (to the parent component)
  // in order to use it to modify the state of the app.
  
  const searchRepos = x => {
    parentCallback(x); 
  }

  return (
    <div id="tabs">
        <div className="tab" onClick={() => searchRepos("React")}>ReactJS</div>
        <div className="tab" onClick={() => searchRepos("Vue")}>Vue</div>
        <div className="tab" onClick={() => searchRepos("Angular")}>Angular</div>
    </div>
  )
}

export default Tabs