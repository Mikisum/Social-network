const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'


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
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      }
      this._state.profilePage.posts.push(newPost)
      this._state.profilePage.newPostText = ''
      this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_POST_TEXT){
      this._state.profilePage.newPostText = action.newText
      this._callSubscriber(this._state)
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.messagesPage.newMessageBody = action.newMessageBody
      this._callSubscriber(this._state)
    } else if (action.type === SEND_MESSAGE) {
      let newMessage = {
        id: 6,
        message: this._state.messagesPage.newMessageBody
      }
      this._state.messagesPage.newMessageBody = ''
      this._state.messagesPage.messages.push(newMessage)
      this._callSubscriber(this._state)
    }
  }
}

export const addPostActionCreator = () => ({
  type: ADD_POST
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, 
    newText: text
})

export const sendMessageCreator = () => ({
  type: SEND_MESSAGE
})

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newMessageBody: body
})

export default store
window.store = store