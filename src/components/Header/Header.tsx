import { Avatar, Button, Space } from 'antd'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { Row, Col, Menu } from 'antd'
import {UserOutlined, HomeOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router';

export const Header: FC= () => {

  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const login = useSelector((state: AppStateType) => state.auth.login)
  const dispatch = useDispatch()
  const data = localStorage.getItem('data')
  const history = useHistory()
  const userId = useSelector((state: AppStateType) => state.auth.userId)

  const logoutCallback = () => {
    dispatch(logout())
  }
  
  return (
      <Row 
        justify='space-between' 
        wrap={false} 
        style={{background:'rgb(0, 0, 0, 0.8)', paddingRight: '15px'}}
        align='middle'>
        
        <Col>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1"><Link to="/profile"><HomeOutlined /></Link></Menu.Item>
              <Menu.Item key="2"><Link to="/users">Developers</Link></Menu.Item>
          </Menu>
        </Col>

      {userId 
      ? <Col>
          <Space>
            <Avatar 
              src={profile?.photos.small}
              alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>

            <Button type='primary' onClick={logoutCallback}>
              Log out</Button>
          </Space>
        </Col>
      : <Col>
          <Button type='primary'>
            <Link to={'/login'}>Login</Link>
          </Button>
        </Col>}
      </Row>
  )
}