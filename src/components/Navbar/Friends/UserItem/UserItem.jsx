import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { followingAPI } from '../../../API/api';
import classes from './UserItem.module.css'

const UserItem = (props) => {

  const {userId, name, followed, follow, unfollow} = props

  let post = (userId) => {
    followingAPI.follow(userId)
    .then(res => {
      if (res.status === 200) {
        follow(userId)
      }
    }) 
}

  let delet = (userId) => {
    followingAPI.unfollow(userId)
    .then(res => {
      if (res.status === 200) {
        unfollow(userId)
      }
    }) 
}
  return (
    <li className={classes.user}>
      <figure className={classes.avatar}>
        <NavLink to={'./profile/' + userId}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQAqIt-HfEdRyz4pqIAX3Nzc3aRSBUkjh87_hCfLoO02qqOx_IP8bAsgg7xBCYEFvHvko&usqp=CAU" alt=""/>
        </NavLink>
      </figure>
      <div className={classes.info}>
        <h4 className={classes.userName}>{name}</h4>
        <p>{props.status}</p>
      </div>
      <div className={classes.btnGroups}>
        {
          followed ? <button onClick={() => delet(userId)} className={classes.btnUnfollow}>Unfollow</button>
          : <button onClick={() => post(userId)} className={classes.btnFollow}>Follow</button>
        }
      </div>
    </li>
  )
}

export default UserItem