import React from 'react';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Navbar/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/Navbar/News/News';
import Music from './components/Navbar/Music/Music';
import Settings from './components/Navbar/Settings/Settings';
import Profile from './components/Profile/Profile';
// import DialogsContainer from './components/Navbar/Dialogs/DialogsContainer';
import UsersContainer from './components/Navbar/Friends/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader';
// import ProfileContainer from './components/Profile/ProfileContainer';
import store from './redux/redux-store'

const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

  componentDidMount () {
    this.props.initializeApp()
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
            <Route path='/login' component={() => <Login />} />
            <Route path='/dialogs' component={() => <DialogsContainer/>} />
            <Route path='/profile/:userId?' component={() =><ProfileContainer/>} />
            <Route path='/users' component={() => <UsersContainer />} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </React.Suspense>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App)

let SocialApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
)}  

export default SocialApp
