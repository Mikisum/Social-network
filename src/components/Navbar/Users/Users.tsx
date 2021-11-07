import Paginator from '../../common/Paginator/Paginator'
import classes from './Users.module.css'
import { UserType } from '../../../types/types'
import { FC, useEffect } from 'react'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers } from '../../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getPageSize, getTotalUsersCount, getUserFilter, getUsers } from '../../../redux/users-selectors'
import { UserItem } from './UserItem/UserItem'
import { useHistory } from 'react-router'
import * as queryString from "querystring"

type PropsType = {}
type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: FC<PropsType> = (props) => {

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
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)


    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch(parsed.friend) {
        case "null":
            actualFilter = {...actualFilter, friend: null}
            break;
        case "true":
            actualFilter = {...actualFilter, friend: true}
            break;
        case "false":
            actualFilter = {...actualFilter, friend: false}
            break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter))
}, [])

useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
        pathname: '/users',
        search: queryString.stringify(query)
    })
}, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  
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