import classes from './Users.module.css'
import { UserType } from '../../../types/types'
import { FC, useEffect } from 'react'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, follow, requestUsers, unfollow } from '../../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserFilter, getUsers } from '../../../redux/users-selectors'
import { useHistory } from 'react-router'
import * as queryString from "querystring"  
import { List, Avatar, Button, Typography } from 'antd'
import avatar from './../../../assets/avatar.png'

const { Title, Text, Link }= Typography;

type PropsType = {}
type QueryParamsType = { term?: string; page?: string; friend?: string; size?: string }

function itemRender(current: number, type: string, originalElement:object) {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}

export const Users: FC<PropsType> = (props) => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const currentPageSize = useSelector(getPageSize)
  const filter = useSelector(getUserFilter)
  const dispatch = useDispatch()
  const history = useHistory()
  const followingInProgress = useSelector(getFollowingInProgress)

  const onPageChanged = (pageNumber: number, pageSize: number | undefined) => {
    if (pageSize !== undefined)
      dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, 10, filter))
  }

  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }
  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter
    let actualPageSize = currentPageSize

    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.size) actualPageSize = Number(parsed.size)

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

    dispatch(requestUsers(actualPage, actualPageSize, actualFilter))
}, [])

useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
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
      <Title level={3} >Users</Title>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={users}
        pagination={{
          current:currentPage,
          itemRender,
          pageSize: currentPageSize,
          total: totalUsersCount,
          onChange: onPageChanged
        }}
          renderItem={(item: UserType) =>(
            <List.Item>
              <List.Item.Meta
                avatar={<Link href={`/profile/${item.id}`}><Avatar src={item.photos.large || avatar} /></Link>}
                title={<Link href={`/profile/${item.id}`}>{item.name}</Link>}
              />
              {item.followed
                ?<Button 
                disabled={followingInProgress.some(id => id === item.id)}
                  onClick={() => onUnfollow(item.id)}>Unfollow</Button>
                :<Button 
                  disabled={followingInProgress.some(id => id === item.id)}
                  type="primary"
                  onClick={() => onFollow(item.id)}>Follow</Button>
              }
              
            </List.Item>
          )
        }
      />
    </div>
  )
}