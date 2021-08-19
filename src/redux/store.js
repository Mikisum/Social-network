import messagesReducer from "./messagesReducer"
import profileReducer from "./profileReducer"
import sideBarReducer from "./sideBarReducer"

let store = {
  _state : {
    profilePage: {
    posts : [
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
  ],
  newPostText: ''
  },
  messagesPage : {
    messages : [
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
    ],
    newMessageBody: '',
    dialogs : [
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
  },
  sideBar : {
    friends: [
      {
        id : 1,
        name: 'Vika'
      },
      {
        id : 2,
        name: 'Dima'
      },
      {
        id : 3,
        name: 'Kolia'
      }
    ]
    }
  },

  _callSubscriber() {
    console.log('State changed')
  },
  
  subscribe(observer) {
    this._callSubscriber = observer
  },

  getState() {
    return this._state
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
    this._state.sideBar = sideBarReducer(this._state.sideBar, action)

    this._callSubscriber(this._state);
  }
}
window.store = store
export default store
