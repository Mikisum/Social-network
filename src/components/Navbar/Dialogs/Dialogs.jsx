import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = (props) => {
  let dialogsElements = props.dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = props.messages.map(message => <Message key={message.message} message={message.message} />)
 
  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.onNewMessageChange(body)
  }

  let onSendMessageChange = () => {
    props.onSendMessageChange()
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
            value={props.newMessageBody}
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