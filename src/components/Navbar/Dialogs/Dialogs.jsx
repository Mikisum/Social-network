import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, Form, reduxForm } from 'redux-form'
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = (props) => {

  let dialogsElements = props.dialogs.map(dialog => <DialogItem  key={dialog.id} name={dialog.name} id={dialog.id} />)
  let messagesElements = props.messages.map(message => <Message key={message.message} message={message.message} />)

  const AddNewMessage = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field 
          placeholder='Enter your message'
          name={'newMessage'}
          component={'textarea'}/>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    )
  }

  const AddNewMessageReduxForm = reduxForm({form: 'DialogsAddNewMessageForm'})(AddNewMessage)

  if (!props.isAuth) return <Redirect to='/login' />

  const onAddPost = (values) => {
    props.onSendMessage(values.newMessage)
  }

    return (
    <div className={classes.dialogs}>
      <ul className={classes.dialogsList}>
        {dialogsElements} 
      </ul>
      <div className={classes.messages}>
        {messagesElements}
        <AddNewMessageReduxForm onSubmit={onAddPost}/>
      </div>
    </div>
  )
}
  
export default Dialogs