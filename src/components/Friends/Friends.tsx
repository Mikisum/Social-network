import React, { FC } from "react";
import classes from './Friends.module.css'
import avatar from '../../assets/avatar.png'
import { UserType } from "../../types/types";

type PropsType = {
  friends: Array<UserType>
}

const Friends = (props: PropsType) => {
const { friends } = props
  return (
    <div className={classes.friends}>
      <h3>Friends</h3>
      <ul className={classes.list}>
        {(friends.length !== 0) ?
          friends.map(friend => 
            <li key={friend.id}>
              <img className={classes.avatar} src={friend.photos.small || avatar}/>
              {friend.name}
            </li>) : <p>you haven't friends</p>
          }
      </ul>
    </div>
  )
}

export default Friends