import React, { Component, ComponentType, FC, useEffect } from 'react';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
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
import Header from './components/Header/Header';
// import ProfileContainer from './components/Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  initializeApp: () => void
}


const App: FC = () => {
  const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => { 
    if(initialized){
      
      dispatch(initializeApp())
    }
  },[initialized])

  // catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
  //   alert(PromiseRejectionEvent)
  // }

  // componentDidMount () {
  //   this.props.initializeApp()
  //   window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  // }
  
  // componentWillUnmount() {
  //   window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  // }


    if (initialized) {
      return <Preloader/>
    }

    return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />  
        <div className='app-wrapper-content'>
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
        </div>
        <FriendsContainer />
      </div>
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
