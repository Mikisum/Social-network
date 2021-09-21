import React from 'react'
import Paginator from '../../common/Paginator/Paginator'
import UserItem from './UserItem/UserItem'
import classes from './Users.module.css'

const Users = ( {currentPage, totalUsersCount, pageSize, onPageChanged, users,  ...props}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  let pages = []
  for(let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let usersList = () => {
    return (
      users.map(user => <UserItem 
      key={user.id} userId={user.id} name={user.name}
      status={user.status} followed={user.followed}
      follow={props.follow} unfollow={props.unfollow}
      isDisabled={props.isDisabled}
      />)
    )
  }

  return (
    <div className={classes.users}>
      <h3 className={classes.heading}>Users
        <span>{props.totalUsersCount}</span>
      </h3>
      <Paginator currentPage = {currentPage}
                  onPageChanged = {onPageChanged}
                  totalUsersCount = {totalUsersCount}
                  pageSize = {pageSize}/>
      <ul className={classes.usersList}>
        {usersList()}</ul>
      <button className={classes.btnShow}>Show more</button>
    </div>
  )
}

export default Users