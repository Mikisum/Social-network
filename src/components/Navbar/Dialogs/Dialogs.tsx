import { Redirect } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import { DialogType, MessageType } from '../../../types/types'


type PropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  onSendMessage: (newMessageBody: string) => void
  isAuth: boolean
}

const Dialogs = (props: PropsType) => {

  let dialogsElements = props.dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = props.messages.map(message => <Message key={message.id} message={message.message} />)
  
  const addMessage = (values: any) => {
    props.onSendMessage(values.newMessageBody)
    values.newMessageBody = ''
  }

  if (!props.isAuth) return <Redirect to='/login' />

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