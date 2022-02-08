import { MessageOutlined, TeamOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Col, Menu, Row, Space } from 'antd'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { getAuthUserId, getIsAuth, getLogin } from '../../redux/auth-selector'
import { getAuthUserProfile } from '../../redux/profileReducer'
import { AppStateType } from '../../redux/redux-store'

export const Header: FC = () => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)
  const authProfile = useSelector((state: AppStateType) => state.profilePage.authProfile)
  const dispatch = useDispatch()
  const data = localStorage.getItem('data')

  const history = useHistory()
  const authUserId = useSelector(getAuthUserId)

  const logoutCallback = () => {
    dispatch(logout())
  }
  useEffect(() => {

    dispatch(getAuthUserProfile(+authUserId!))

  }, [])

  return (
    <Row justify='space-between' wrap={false} style={{ background: 'rgb(0, 0, 0, 0.8)', paddingRight: '15px' }} align='middle'>
      <Link to='/profile' style={{ padding: '5px 15px' }}>
        <FontAwesomeIcon icon={['fab', 'themeisle']} color='MediumOrchid' size='3x' />
      </Link>
      <Col>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
            <Link to={`/profile/`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<MessageOutlined />}>
            <Link to='/dialogs'>Messages</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<TeamOutlined />}>
            <Link to='/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<WechatOutlined />}>
            <Link to='/chat'>Chat</Link>
          </Menu.Item>
        </Menu>
      </Col>

      {isAuth ? (
        <Col>
          <Space>
            <Avatar src={authProfile?.photos.small} alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />

            <Button type='primary' onClick={logoutCallback}>
              Log out
            </Button>
          </Space>
        </Col>
      ) : (
        <Col>
          <Button type='primary'>
            <Link to={'/login'}>Login</Link>
          </Button>
        </Col>
      )}
    </Row>
  )
}
