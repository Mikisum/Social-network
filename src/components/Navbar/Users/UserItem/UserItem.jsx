import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './UserItem.module.css'
import avatar from './../../../../assets/avatar.png'
const UserItem = ({userId, name, photos, followed, follow, unfollow, followingInProgress, status}) => {

  return (
    <li className={classes.user}>
      <figure className={classes.avatar}>
        <NavLink to={'/profile/' + userId}>
            <img src={photos.large || avatar} alt=""/>
        </NavLink>
      </figure>
      <div className={classes.info}>
        <h4 className={classes.userName}>{name}</h4>
        <p>{status}</p>
      </div>
      <div>
        {
          followed ? 
            <button 
              disabled={followingInProgress.some(id => id === userId)}
              onClick={() => unfollow(userId)}
              className={classes.btnUnfollow}>
                Unfollow
            </button>
          : <button 
              disabled={followingInProgress.some(id => id === userId)}
              onClick={() => follow(userId)} 
              className={classes.btnFollow}>
                Follow
            </button>
        }
      </div>
    </li>
  )
}

export default UserItem