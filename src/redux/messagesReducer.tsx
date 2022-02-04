import { DialogType, MessageType } from '../types/types'
import { InferActionsTypes } from './redux-store'

const initialState = {
  messages: [
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
  dialogs: [
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

export const actions = {
  sendMessage: (newMessageBody: string) => ({ type: 'SN/messagesPage/SEND_MESSAGE', newMessageBody } as const)
}
const messagesReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/messagesPage/SEND_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, { id: state.messages.length + 1, message: action.newMessageBody }]
      }

    default:
      return state
  }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default messagesReducer
