import Paginator from '../../common/Paginator/Paginator'
import classes from './Users.module.css'
import { UserType } from '../../../types/types'
import { FC, useEffect } from 'react'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers } from '../../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserFilter, getUsers } from '../../../redux/users-selectors'
import { UserItem } from './UserItem/UserItem'

type PropsType = {}

export const Users: FC<PropsType> = (props) => {
  // let pagesCount = Math.ceil(totalUsersCount / pageSize)

  // let pages = []
  // for(let i = 1; i <= pagesCount; i++) {
  //   pages.push(i)
  // }

  let usersList = () => {
    return (
      users.map(u => <UserItem 
      user={u}
      key={u.id}
      />)
    )
  }

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUserFilter)

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  },[])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const dispatch = useDispatch()
  return (
    <div className={classes.users}>
      <h3 className={classes.heading}>Users
        <span>{totalUsersCount}</span>
      </h3>
      <Paginator currentPage = {currentPage}
                  onPageChanged = {onPageChanged}
                  totalItemsCount = {totalUsersCount}
                  pageSize = {pageSize}
      />
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <ul className={classes.usersList}>
        {usersList()}</ul>
      <button className={classes.btnShow}>Show more</button>
    </div>
  )
}