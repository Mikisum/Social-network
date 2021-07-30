import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = (props) => {
  
  const {dialogs, messages} = props
  
  let dialogsElements = dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = messages.map(message => <Message key={message.message} message={message.message} />)
  
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements} 
      </div>
      <div className={classes.messages}>
        {messagesElements}
      </div>
    </div>
  )
}

export default Dialogs