import React from 'react';
import classes from './Friends.module.css'

const FriendItem = (props) => {
  return (
    <li className={classes.friend}>
          <figure className={classes.avatar}>
            <a href="time-line.html" title="">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQAqIt-HfEdRyz4pqIAX3Nzc3aRSBUkjh87_hCfLoO02qqOx_IP8bAsgg7xBCYEFvHvko&usqp=CAU" alt=""/></a>
          </figure>
          <div className={classes.info}>
            <h4 className={classes.friendName}>{props.name}</h4>
            <p>{props.status}</p>
          </div>
          <div className={classes.btnGroups}>
              <button type="submit" className={classes.btnAdd}>Follow</button>
              <button type="submit" className={classes.btnDelete}>Unfollow</button>
          </div>
        </li>
  )
}

export default FriendItem