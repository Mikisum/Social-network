import React, { Component, ComponentType, FC, useEffect } from 'react';
import { BrowserRouter, Route, withRouter, Switch, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// import './App.less';
import Navbar from './components/Navbar/Navbar';
import News from './components/Navbar/News/News';
import Music from './components/Navbar/Music/Music';
import Settings from './components/Navbar/Settings/Settings';
import { UsersPage } from './components/Navbar/Users/UsersContainer';
import { LoginPage } from './components/Login/Login';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader';
import store, { AppStateType } from './redux/redux-store'
import Friends from './components/Friends/Friends';
import FriendsContainer from './components/Friends/FriendsContainer';
import { QueryParamProvider } from 'use-query-params';
import {Header} from './components/Header/Header';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeOutlined,
  MessageOutlined, TeamOutlined, WechatOutlined  } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

const App: FC = () => {
  const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => { 
    if(initialized){
      
      dispatch(initializeApp())
    }
  },[initialized])

    if (initialized) {
      return <Preloader/>
    }

    return (
      <Layout>
      <Header/>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
            >
              <Menu.Item key='1' icon={<UserOutlined/>}> 
                <Link to={`/profile/`}>Profile</Link>
              </Menu.Item>
              <Menu.Item key='2' icon={<MessageOutlined />}>
                <Link to="/dialogs">Messages</Link>
              </Menu.Item>
              <Menu.Item key='3' icon={<TeamOutlined />}>          
                <Link to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item key='4' icon={<WechatOutlined />}>          
                <Link to="/chat">Chat</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <React.Suspense fallback={<Preloader />}>
           <Switch>
             <Redirect exact from='/' to='/profile'/>
             <Route path='/login' render={() => <LoginPage />} />
             <Route path='/dialogs' render={() => <DialogsContainer/>} />
             <Route path='/profile/:userId?' render={() =><ProfileContainer/>} />
             <Route path='/users' render={() => <UsersPage pageTitle='Social Network'/>} />
             <Route path='/chat' render={() => <ChatPage/>} />
             <Route path='/news' render={News} />
             <Route path='/music' render={Music} />
             <Route path='/settings' render={Settings} />
             <Route path='*' render={() => <div>404 NOT FOUND</div>} />
           </Switch>
         </React.Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App)

const SocialApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AppContainer/>
        </QueryParamProvider>
      </Provider>
    </BrowserRouter>
)}  

export default SocialApp
