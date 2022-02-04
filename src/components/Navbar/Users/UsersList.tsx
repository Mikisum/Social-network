import { Avatar, Button, List, Typography } from 'antd'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUserFilter,
  getUsers
} from '../../../redux/users-selectors'
import { follow, requestUsers, unfollow } from '../../../redux/usersReducer'
import { UserType } from '../../../types/types'
import avatar from './../../../assets/avatar.png'

const { Link } = Typography

type PropsType = {}

function itemRender(current: number, type: string, originalElement: object) {
  if (type === 'prev') {
    return <a>Previous</a>
  }
  if (type === 'next') {
    return <a>Next</a>
  }
  return originalElement
}

export const UsersList: FC<PropsType> = () => {
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const currentPageSize = useSelector(getPageSize)
  const filter = useSelector(getUserFilter)
  const dispatch = useDispatch()
  const followingInProgress = useSelector(getFollowingInProgress)

  const onPageChanged = (pageNumber: number, pageSize: number | undefined) => {
    if (pageSize !== undefined) dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }
  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <List
      className='demo-loadmore-list'
      itemLayout='horizontal'
      dataSource={users}
      pagination={{
        current: currentPage,
        itemRender,
        pageSize: currentPageSize,
        total: totalUsersCount,
        onChange: onPageChanged
      }}
      renderItem={(item: UserType) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={
              <Link href={`/profile/${item.id}`}>
                <Avatar src={item.photos.large || avatar} />
              </Link>
            }
            title={<Link href={`/profile/${item.id}`}>{item.name}</Link>}
          />
          {item.followed ? (
            <Button disabled={followingInProgress.some((id) => id === item.id)} onClick={() => onUnfollow(item.id)}>
              Unfollow
            </Button>
          ) : (
            <Button disabled={followingInProgress.some((id) => id === item.id)} type='primary' onClick={() => onFollow(item.id)}>
              Follow
            </Button>
          )}
        </List.Item>
      )}
    />
  )
}

// users cards

{
  /* <List
         grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        header={totalCount}
        dataSource={friends}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              extra={<Link href={`/profile/${item.id}`}>View profile</Link>}
             >
              <Meta
                avatar={<Avatar src={item.photos.small || avatar} />}
                title={item.name}
              />
            </Card>
          </List.Item>
        )}
      /> */
}
