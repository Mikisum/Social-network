import React from "react";
import classes from './Friends.module.css'
import avatar from '../../assets/avatar.png'

const Friends = (props) => {

  return (
    <div className={classes.friends}>
      <h3>Friends</h3>
      <ul className={classes.list}>
        {props.friends.map(friend => 
          <li key={friend.id}>
            <img className={classes.avatar} src={friend.photos.small || avatar}/>
            {friend.name}
          </li>)}
      </ul>
    </div>
  )
}

export default Friends