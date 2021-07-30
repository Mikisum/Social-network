import React from 'react'
import classes from './FriendItem.module.css'

const FriendItem = (props) => {

  const { name } = props

  return (
    <div>
      <div className={classes.avatar}></div>
      <h4>{name}</h4>
    </div>
  )
}

export default FriendItem