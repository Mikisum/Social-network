import React, { FC } from "react";
import classes from './Friends.module.css'
import avatar from '../../assets/avatar.png'
import { UserType } from "../../types/types";

type PropsType = {
  friends: Array<UserType>
}

const Friends = (props: PropsType) => {

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