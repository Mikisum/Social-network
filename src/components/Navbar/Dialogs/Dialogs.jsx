import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Dialogs.module.css'

const DialogItem = (props) => {

  let path = "/dialogs/" + props.id

  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

const Message = (props) => {
  return (
    <div className={classes.message}>{props.message}</div>
  )
}

const Dialogs = (props) => {
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        <DialogItem name="Sveta" id="1"/>  
        <DialogItem name="Vova" id="2"/>  
        <DialogItem name="Vika" id="3"/>  
        <DialogItem name="Dima" id="4"/>  
        <DialogItem name="Masha" id="5"/>  
        <DialogItem name="Pasha" id="6"/>  
      </div>
      <div className={classes.messages}>
        <Message message="hi" />
        <Message message="How is your day?" />
        <Message message="Good bye!" />
        <Message message="Hello!" />
      </div>
    </div>
  )
}

export default Dialogs