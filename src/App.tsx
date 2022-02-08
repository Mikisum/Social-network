import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Layout } from 'antd'
import React, { ComponentType, FC, useEffect } from 'react'
import { connect, Provider, useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { QueryParamProvider } from 'use-query-params'
import Preloader from './components/common/preloader/preloader'
import { Header } from './components/Header/Header'
import { LoginPage } from './components/Login/LoginPage'
import Music from './components/Navbar/Music/Music'
import News from './components/Navbar/News/News'
import Settings from './components/Navbar/Settings/Settings'
import { UsersPage } from './components/Navbar/Users/UsersContainer'
import { initializeApp } from './redux/app-reducer'
import store, { AppStateType } from './redux/redux-store'
library.add(fab, fas)

const { Content, Footer } = Layout

const Dialogs = React.lazy(() => import('./components/Navbar/Dialogs/Dialogs'))
const Profile = React.lazy(() => import('./components/Profile/Profile'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

const App: FC = () => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp())
    }
  }, [initialized])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Layout className='site-layout'>
          <Content style={{ margin: '15px 15px', overflow: 'initial' }}>
            <React.Suspense fallback={<Preloader />}>
              <Switch>
                <Redirect exact from="/" to='/profile' />
                <Route path='/login' render={() => <LoginPage />} />
                <Route path='/dialogs' render={() => <Dialogs />} />
                <Route path='/profile/:userId?' render={() => <Profile />} />
                <Route path='/users' render={() => <UsersPage pageTitle='Social Network' />} />
                <Route path='/chat' render={() => <ChatPage />} />
                <Route path='/news' render={News} />
                <Route path='/music' render={Music} />
                <Route path='/settings' render={Settings} />
                <Route path='*' render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </React.Suspense>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Social Network @2021 by Viktoryia Kiyanka</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App)

const SocialApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AppContainer />
        </QueryParamProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default SocialApp
