import { DialogType, MessageType } from "../types/types"

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
  ] as Array<MessageType>,
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
  ] as Array<DialogType>
}

export type InitialStateType = typeof initialState

type ActionsType = SendMessageCreatorActionType

const messagesReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch(action.type) {
    
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, {id: state.messages.length + 1, message: action.newMessage}]
      }
    
    default: 
      return state
  }  
}

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE,
  newMessage: string
}

export const sendMessageCreator = (newMessage: string): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessage
})

export default messagesReducer