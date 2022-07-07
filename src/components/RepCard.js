import React from 'react';
import './repcard.css';

function RepCard(props) {
    // The repository card displayed on the main list.
  return (
    <div className="rep-card">
        <ul>        
            <li><img src={props.avatar} /></li>
            <li id='rep-login'>{props.login}</li>
            <li id='rep-name'>{props.name}</li>
            <li id='rep-stars'>{props.stars} stars</li>
            <li id='rep-forks'>{props.forks} forks</li>
        </ul>
    </div>
  )
}

export default RepCard