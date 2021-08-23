import React from 'react'
import FriendItem from './FriendItem/FriendItem'
import classes from './Friends.module.css'

const Friends = (props) => {
  let friendsList = props.friends.map(friend => <FriendItem 
      key={friend.id} name={friend.name}  status={friend.status}
    />)
  return (
    <div className={classes.friends}>
      <h3 className={classes.heading}>My friends
        <span>6</span>
      </h3>
      <ul className={classes.friendsList}>{friendsList}</ul>
    </div>
  )
}

export default Friends