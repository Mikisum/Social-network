import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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

const App = () => {
  
  return (
   
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />  
        <div className='app-wrapper-content'>
          <Route path='/dialogs' component={() => <DialogsContainer />} />
          <Route path='/profile/:userId?' component={() => <Profile />} />
          <Route path='/users' component={() => <UsersContainer />} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
        </div>
      </div>
  
    );
}

export default App;
