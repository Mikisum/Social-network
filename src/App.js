import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Navbar/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/Navbar/News/News';
import Music from './components/Navbar/Music/Music';
import Settings from './components/Navbar/Settings/Settings';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Navbar/Dialogs/DialogsContainer';
import UsersContainer from './components/Navbar/Friends/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/preloader/preloader';
import ProfileContainer from './components/Profile/ProfileContainer';
import store from './redux/redux-store'

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
          <Route path='/login' component={() => <Login />} />
          <Route path='/dialogs' component={() => <DialogsContainer />} />
          <Route path='/profile/:userId?' component={() => <ProfileContainer />} />
          <Route path='/users' component={() => <UsersContainer />} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
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
