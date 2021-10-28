import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './UserItem.module.css'
import avatar from './../../../../assets/avatar.png'
import { PhotosType, UserType } from '../../../../types/types';

type PropsType = {
  user: UserType
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
}
const UserItem: FC<PropsType> = ({user, follow, unfollow, followingInProgress }) => {

  return (
    <li className={classes.user}>
      <figure className={classes.avatar}>
        <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.large || avatar} alt=""/>
        </NavLink>
      </figure>
      <div className={classes.info}>
        <h4 className={classes.userName}>{user.name}</h4>
      </div>
      <div>
        {
          user.followed ? 
            <button 
              disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => {
              
                return unfollow(user.id)}}
              className={classes.btnUnfollow}>
                Unfollow
            </button>
          : <button 
              disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => { 
                
                return follow(user.id)} 
              }
              className={classes.btnFollow}>
                Follow
            </button>
        }
      </div>
    </li>
  )
}

export default UserItem