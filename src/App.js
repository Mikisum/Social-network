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

const App = (props) => {
  console.log(props)
  const {state: {messagesPage: { dialogs, messages }, profilePage: { posts },  sideBar: { friends }} } = props
  
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />  
        <div className='app-wrapper-content'>
          <Route path='/dialogs' component={() => <Dialogs dialogs={dialogs} messages={messages}/>}  />
          <Route path='/profile' component={() => <Profile posts={posts} friends={friends}/>} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
        </div>
      </div>
    </BrowserRouter>
    );
}

export default App;
