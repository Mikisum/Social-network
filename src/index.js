import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
let dialogs = [
  {
    id: 1,
    name: 'Sveta'
  },
  {
    id: 2,
    name: 'Vova'
  },
  {
    id: 3,
    name: 'Vika'
  },
  {
    id: 4,
    name: 'Dima'
  },
  {
    id: 5,
    name: 'Masha'
  },
  {
    id: 6,
    name: 'Pasha'
  }
]

let messages = [
  {
    id: 1,
    message: 'hi'
  },
  {
    id: 2,
    message: 'How is your day?'
  },
  {
    id: 3,
    message: 'Good bye'
  },
  {
    id: 4,
    message: 'Hello!'
  }
]

let posts = [
  {
    id: 1,
    message: 'hey',
    likesCount: 10
  },
  {
    id: 2,
    message: 'What?',
    likesCount: 15
  }
]
ReactDOM.render(
  
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages} posts={posts}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
