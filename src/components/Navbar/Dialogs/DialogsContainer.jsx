import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {

  let state = props.store.getState()

  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body))
  }

  let onSendMessageChange = () => {
    props.store.dispatch(sendMessageCreator())
  }

    return (<Dialogs onNewMessageChange={onNewMessageChange}
                      onSendMessageChange={onSendMessageChange} 
                      newMessageBody={state.messagesPage.newMessageBody}
                      dialogs={state.messagesPage.dialogs}
                      messages={state.messagesPage.messages}/>)
    
}
  
export default DialogsContainer