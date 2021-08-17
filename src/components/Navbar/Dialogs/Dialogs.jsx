import { render } from '@testing-library/react'
import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = (props) => {
  
  let state = props.store.getState().messagesPage;
  
  let dialogsElements = state.dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = state.messages.map(message => <Message key={message.message} message={message.message} />)
 
  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.store.dispatch(updateNewMessageBodyCreator(body))
  }

  let onSendMessageChange = () => {
    props.store.dispatch(sendMessageCreator())
  }

    return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements} 
      </div>
      <div className={classes.messages}>
        {messagesElements}
        <div>
          <textarea 
            placeholder='Enter your message'
            value={state.newMessageBody}
            onChange={onNewMessageChange} /> 
        </div>
        <div>
          <button onClick={onSendMessageChange}>Add post</button>
        </div>
      </div>
    </div>
  )
}
  
export default Dialogs