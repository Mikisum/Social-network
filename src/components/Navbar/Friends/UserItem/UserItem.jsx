import React from 'react';
import classes from './UserItem.module.css'

const UserItem = (props) => {

  const {userId, name, followed} = props

  return (
    <li className={classes.user}>
          <figure className={classes.avatar}>
            <a href="time-line.html" title="">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQAqIt-HfEdRyz4pqIAX3Nzc3aRSBUkjh87_hCfLoO02qqOx_IP8bAsgg7xBCYEFvHvko&usqp=CAU" alt=""/></a>
          </figure>
          <div className={classes.info}>
            <h4 className={classes.userName}>{name}</h4>
            <p>{props.status}</p>
          </div>
          <div className={classes.btnGroups}>
            {
              followed ? <button onClick={() => {props.unfollow(userId)}} className={classes.btnUnfollow}>Unfollow</button>
              : <button onClick={() => {props.follow(userId)}} className={classes.btnFollow}>Follow</button>
            }
          </div>
        </li>
  )
}

export default UserItem