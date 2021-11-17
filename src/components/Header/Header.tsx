import { Avatar, Button, Layout } from 'antd'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import classes from './Header.module.css'
import { Row, Col, Divider, Menu } from 'antd'
import {UserOutlined, HomeOutlined} from '@ant-design/icons'
import { blue } from '@ant-design/colors'

export const Header: FC= () => {

  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)

  const login = useSelector((state: AppStateType) => state.auth.login)
  const dispatch = useDispatch()
  const {Header} = Layout

  const logoutCallback = () => {
    dispatch(logout())
  }
  return (
    <Header className='header'>
      <Row>
      <Col span={21}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/profile"><HomeOutlined /></Link></Menu.Item>
            <Menu.Item key="2"><Link to="/users">Developers</Link></Menu.Item>
        </Menu>
      </Col>

      {isAuth 
      ? <><Col span={1}> 
            <Avatar 
              src={profile?.photos.small}
              alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
          </Col>
          <Col span={2}>
            <Button type='primary' onClick={logoutCallback}>Log out</Button>
          </Col>
        </>
      : <Col>
          <Button type='primary'>
            <Link to={'/login'}>Login</Link>
          </Button>
        </Col>}
      </Row>
    </Header>
  )
}