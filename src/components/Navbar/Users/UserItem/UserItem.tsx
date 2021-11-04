import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './UserItem.module.css'
import avatar from './../../../../assets/avatar.png'
import { PhotosType, UserType } from '../../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingInProgress } from '../../../../redux/users-selectors';
import {follow,unfollow} from '../../../../redux/usersReducer';

type PropsType = {
  user: UserType
}

export const UserItem: FC<PropsType> = ({ user }) => {

  const dispatch = useDispatch()
  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }
  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }
  const followingInProgress = useSelector(getFollowingInProgress)


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
              onClick={() => onUnfollow(user.id)}
              className={classes.btnUnfollow}>
                Unfollow
            </button>
          : <button 
              disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => onFollow(user.id)
          }
              className={classes.btnFollow}>
                Follow
            </button>
        }
      </div>
    </li>
  )
}
