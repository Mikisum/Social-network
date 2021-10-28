import { Redirect } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import { DialogType, MessageType } from '../../../types/types'
import { InitialStateType } from '../../../redux/messagesReducer'
import { FC } from 'react'


type PropsType = {
  messagesPage: InitialStateType
  sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

const Dialogs: FC<PropsType> = (props) => {
  let state = props.messagesPage
  let dialogsElements = state.dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = state.messages.map(message => <Message key={message.id} message={message.message} />)
  
  let addMessage = (values:NewMessageFormValuesType) => {
   
    props.sendMessage(values.newMessageBody)
    debugger
    values.newMessageBody = ''
  }

  return (
    <div className={classes.dialogs}>
      <ul className={classes.dialogsList}>
        {dialogsElements} 
      </ul>
      <div className={classes.messages}>
        {messagesElements}
        <AddMessageForm onSubmit={addMessage}/>
      </div>
    </div>
  )
}
  
export default Dialogs