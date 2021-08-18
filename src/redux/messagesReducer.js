const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'


let initialState = {
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
}

const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_MESSAGE:
    let newMessage = {
      id: 6,
      message: state.newMessageBody
    }
   
    state.messages.push(newMessage)
    state.newMessageBody = ''
    return state
  
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.newMessageBody
      return state
    default: 
      return state
  }  
}

export const sendMessageCreator = () => ({
  type: SEND_MESSAGE
})

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newMessageBody: body
})

export default messagesReducer