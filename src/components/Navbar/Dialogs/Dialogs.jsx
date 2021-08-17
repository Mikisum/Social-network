import { render } from '@testing-library/react'
import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/state'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = (props) => {
  
  const {messagesPage: {dialogs, messages, newMessageBody}, dispatch} = props
  
  let dialogsElements = dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = messages.map(message => <Message key={message.message} message={message.message} />)
  // let newPostElement = React.createRef()
  let onNewMessageChange = (e) => {
    let body = e.target.value
    dispatch(updateNewMessageBodyCreator(body))
  }

  let onSendMessageChange = () => {
    dispatch(sendMessageCreator())
  }

  // let addPost = () => {
  //   let text = newPostElement.current.value
  //   alert(text)
  // }
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
            value={newMessageBody}
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