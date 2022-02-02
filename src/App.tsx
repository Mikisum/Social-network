import React, { ComponentType, FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, withRouter, Switch, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import News from './components/Navbar/News/News';
import Music from './components/Navbar/Music/Music';
import Settings from './components/Navbar/Settings/Settings';
import { UsersPage } from './components/Navbar/Users/UsersContainer';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader';
import store, { AppStateType } from './redux/redux-store'
import { QueryParamProvider } from 'use-query-params';
import {Header} from './components/Header/Header';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined,
  MessageOutlined, TeamOutlined, WechatOutlined} from '@ant-design/icons';
import { LoginPage } from './components/Login/LoginPage';
import Friends from './components/Friends/Friends';
import FriendsContainer from './components/Friends/FriendsContainer';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const Dialogs = React.lazy(() => import('./components/Navbar/Dialogs/Dialogs'));
const Profile = React.lazy(() => import('./components/Profile/Profile'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

const App: FC = () => {
  const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => { 
    if(!initialized){
      dispatch(initializeApp())
    }
  },[initialized])

  const [collapsed, setCollapsed] = useState(false)

    if (!initialized) {
      return <Preloader/>
    }

    return (
      <Layout style={{minHeight:'100vh'}}>
        <Header/>
        <Layout>
          <Sider 
            breakpoint='sm'
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            theme='light'
          >
            <Menu
              mode="inline"
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
        <Layout className="site-layout">
          
          <Content style={{ margin: '15px 15px', overflow: 'initial' }}>
      
        
            <React.Suspense fallback={<Preloader />}>
              <Switch>  
                <Redirect exact from='/' to='/profile'/>
                <Route path='/login' render={() => <LoginPage />} />
                <Route path='/dialogs' render={() => <Dialogs/>} />
                <Route path='/profile/:userId?' render={() =><Profile/>} />
                <Route path='/users' render={() => <UsersPage pageTitle='Social Network'/>} />
                <Route path='/chat' render={() => <ChatPage/>} />
                <Route path='/news' render={News} />
                <Route path='/music' render={Music} />
                <Route path='/settings' render={Settings} />
                <Route path='*' render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </React.Suspense>
          </Content>
        

        <Footer style={{ textAlign: 'center'}}>Social Network @2021 by Viktoryia Kiyanka</Footer>
        </Layout>
        </Layout>
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
