import React, { FC } from 'react'
import classes from './Post.module.css'

type PropsType = {
  message: string
  count: number
}
const Post: FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <img
        alt=''
        src='data:image/jpeg;base64,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'
      ></img>
      {props.message}
      <div>
        <span>{props.count}</span>
      </div>
    </div>
  )
}

export default Post
