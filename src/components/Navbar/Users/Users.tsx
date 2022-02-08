import { Typography } from 'antd'
import * as queryString from 'querystring'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getCurrentPage, getPageSize, getUserFilter } from '../../../redux/users-selectors'
import { FilterType, requestUsers } from '../../../redux/usersReducer'
import classes from './Users.module.css'
import { UsersList } from './UsersList'
import UsersSearchForm from './UsersSearchForm'

const { Title } = Typography

type PropsType = {}
type QueryParamsType = { term?: string; page?: string; friend?: string; size?: string }

export const Users: FC<PropsType> = (props) => {
  const currentPage = useSelector(getCurrentPage)
  const currentPageSize = useSelector(getPageSize)
  const filter = useSelector(getUserFilter)
  const dispatch = useDispatch()
  const history = useHistory()

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, 10, filter))
  }

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter
    let actualPageSize = currentPageSize

    if (parsed.page) actualPage = Number(parsed.page)
    if (parsed.size) actualPageSize = Number(parsed.size)

    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }

    dispatch(requestUsers(actualPage, actualPageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    if (currentPageSize !== 10) query.size = String(currentPageSize)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage, currentPageSize])

  return (
    <div className={classes.users}>
      <Title level={3}>Users</Title>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <UsersList />
    </div>
  )
}
