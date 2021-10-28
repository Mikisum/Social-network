import React, { Component, ComponentType, FC } from 'react';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/Navbar/News/News';
import Music from './components/Navbar/Music/Music';
import Settings from './components/Navbar/Settings/Settings';
import UsersContainer from './components/Navbar/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader';
import store, { AppStateType } from './redux/redux-store'
import Friends from './components/Friends/Friends';
import FriendsContainer from './components/Friends/FriendsContainer';

const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  initializeApp: () => void
}


class App extends Component<MapStatePropsType & MapDispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert(PromiseRejectionEvent)
  }

  componentDidMount () {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  render() {

    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />  
        <div className='app-wrapper-content'>
        <React.Suspense fallback={<Preloader />}>
          <Switch>
            <Redirect exact from='/' to='/profile'/>
            <Route path='/login' render={() => <Login />} />
            <Route path='/dialogs' render={() => <DialogsContainer/>} />
            <Route path='/profile/:userId?' render={() =><ProfileContainer/>} />
            <Route path='/users' render={() => <UsersContainer pageTitle='Social Network'/>} />
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
        <AppContainer/>
      </Provider>
    </BrowserRouter>
)}  

export default SocialApp
