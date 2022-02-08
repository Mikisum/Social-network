import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../redux/messagesReducer'
import { AppStateType } from '../../../redux/redux-store'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

type PropsType = {}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

export const Dialogs: FC<PropsType> = () => {
  const dispatch = useDispatch()
  const dialogs = useSelector((state: AppStateType) => state.messagesPage.dialogs)
  const messages = useSelector((state: AppStateType) => state.messagesPage.messages)

  const dialogsElements = dialogs.map((dialog) => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />)
  const messagesElements = messages.map((message) => <Message key={message.id} message={message.message} />)

  const addMessage = (values: NewMessageFormValuesType) => {
    dispatch(actions.sendMessage(values.newMessageBody))
    values.newMessageBody = ''
  }

  return (
    <div className={classes.dialogs}>
      <ul className={classes.dialogsList}>{dialogsElements}</ul>
      <div className={classes.messages}>
        {messagesElements}
        <AddMessageForm onSubmit={addMessage} />
      </div>
    </div>
  )
}

export default Dialogs
