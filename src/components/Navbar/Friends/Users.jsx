import axios from 'axios'
import React from 'react'
import UserItem from './UserItem/UserItem'
import classes from './Users.module.css'

const Users = (props) => {
  let getUsers = () => {
    if (props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users')
      .then(res => props.setUsers(res.data.items))
    }
  }
  
  let usersList = 
    props.users.map(user => <UserItem 
      key={user.id} userId={user.id} name={user.name}
      status={user.status} followed={user.followed}
      follow={props.follow} unfollow={props.unfollow}
    />)

    
  return (
    <div className={classes.users}>
      <h3 className={classes.heading}>Users
        <span>6</span>
      </h3>
      <ul className={classes.usersList}>
        {
        usersList}</ul>
      <button className={classes.btnShow}>Show more</button>
    </div>
  )
}

export default Users