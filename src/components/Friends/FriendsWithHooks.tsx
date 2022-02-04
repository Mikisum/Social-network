import React, { FC, useEffect } from 'react'
import classes from './Friends.module.css'
import avatar from '../../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { requestFriends } from '../../redux/sideBarReducer'
import { Avatar, List, Typography } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
const { Link } = Typography

type PropsType = {}

export const Friends: FC<PropsType> = () => {
  const friends = useSelector((state: AppStateType) => state.sideBar.friends)
  const totalCount = useSelector((state: AppStateType) => state.sideBar.totalCount)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestFriends())
  }, [])

  return (
    <List
      className={classes.list}
      itemLayout='horizontal'
      header={<Text strong>Friends {totalCount}</Text>}
      dataSource={friends}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.photos.small || avatar} />}
            title={<Link href={`/profile/${item.id}`}>{item.name}</Link>}
          />
        </List.Item>
      )}
    />
  )
}

export default Friends
