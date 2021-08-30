import React from 'react'
import UserItem from './UserItem/UserItem'
import classes from './Users.module.css'

const Users = (props) => {
  console.log(props)
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []
  for(let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let usersList = () => {
    return (
      props.users.map(user => <UserItem 
      key={user.id} userId={user.id} name={user.name}
      status={user.status} followed={user.followed}
      follow={props.follow} unfollow={props.unfollow}
      />)
    )
  }

  return (
    <div className={classes.users}>
      <h3 className={classes.heading}>Users
        <span>{props.totalUsersCount}</span>
      </h3>
      <div>
        {pages.map((p,idx) => <span key={idx} className={props.currentPage === p ? classes.selectedPage : undefined}
        onClick={(e)=> props.onPageChanged(p)}>{p<7 ? p : null}</span>)}
      </div>
      <ul className={classes.usersList}>
        {usersList()}</ul>
      <button className={classes.btnShow}>Show more</button>
    </div>
  )
}

export default Users