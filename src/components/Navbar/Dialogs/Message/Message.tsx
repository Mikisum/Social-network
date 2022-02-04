import React, { FC } from 'react'
import { MessageType } from '../../../../types/types'
import classes from './../Dialogs.module.css'

const Message: FC<MessageType> = (props) => {
  return <div className={classes.message}>{props.message}</div>
}

export default Message
