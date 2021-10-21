import Paginator from '../../common/Paginator/Paginator'
import UserItem from './UserItem/UserItem'
import classes from './Users.module.css'
import { UserType } from '../../../types/types'
import { FC } from 'react'

type PropsType = {
  currentPage: number
  totalUsersCount: number 
  pageSize: number
  onPageChanged: (pageNumber: number) => void 
  users: Array<UserType>
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ( {currentPage, totalUsersCount, pageSize, onPageChanged, users,  ...props}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  let pages = []
  for(let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let usersList = () => {
    return (
      users.map(user => <UserItem 
      photos={user.photos}
      key={user.id} userId={user.id} name={user.name}
      status={user.status} followed={user.followed}
      follow={props.follow} unfollow={props.unfollow}
      followingInProgress={props.followingInProgress}
      />)
    )
  }

  return (
    <div className={classes.users}>
      <h3 className={classes.heading}>Users
        <span>{totalUsersCount}</span>
      </h3>
      <Paginator currentPage = {currentPage}
                  onPageChanged = {onPageChanged}
                  totalItemsCount = {totalUsersCount}
                  pageSize = {pageSize}/>
      <ul className={classes.usersList}>
        {usersList()}</ul>
      <button className={classes.btnShow}>Show more</button>
    </div>
  )
}

export default Users