import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './UserItem.module.css'

const UserItem = (props) => {
  const {userId, name, followed, follow, unfollow, isDisabled} = props

//   let post = (userId) => {
//     usersAPI.follow(userId)
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         follow(userId)
//       }
//       toggleIsDisabled(false, userId)
//     }) 
// }

//   let delet = (userId) => {
//     usersAPI.unfollow(userId)
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         unfollow(userId)
//       }
//       toggleIsDisabled(false, userId)
//     }) 
// }
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
      <div className={classes.btnFollow}>
        {
          followed ? 
            <button 
              disabled={isDisabled.some(id => id === userId)}
              onClick={() => follow(userId)} 
              className={classes.btnUnfollow}>
                Unfollow
            </button>
          : <button 
              disabled={isDisabled.some(id => id === userId)}
              onClick={() => unfollow(userId)} 
              className={classes.btnFollow}>
                Follow
            </button>
        }
      </div>
    </li>
  )
}

export default UserItem