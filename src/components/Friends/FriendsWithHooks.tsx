import React, { FC, useEffect } from "react";
import classes from './Friends.module.css'
import avatar from '../../assets/avatar.png'
import { UserType } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { requestFriends } from "../../redux/sideBarReducer";

type PropsType = {}




const Friends: FC<PropsType> = () => {

  const friends = useSelector((state: AppStateType) => state.sideBar.friends)
  const totalCount = useSelector((state:AppStateType) => state.sideBar.totalCount)
  const followingInProgress = useSelector((state:AppStateType) => state.usersPage.followingInProgress)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestFriends())
  },[])

  return (
    <div className={classes.friends}>
      <h3>Friends: {totalCount}</h3>
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