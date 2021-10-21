import React from 'react'
import { MessageType } from '../../../../types/types'
import classes from './../Dialogs.module.css'

const Message = (props: MessageType) => {
  return (
    <div className={classes.message}>{props.message}</div>
  )
}

export default Message