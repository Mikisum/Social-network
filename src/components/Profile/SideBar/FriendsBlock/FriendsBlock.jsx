import React from 'react'
import FriendItem from './FriendItem/FriendItem'
import classes  from './FriendsBlock.module.css'

const FriendsBlock = (props) => {

    return (
      <div className={classes.friendsBlock}>
        <h3 className={classes.title}>Friends</h3>
        <div className={classes.friends}>
          {props.friends.map( friend => <FriendItem key={friend.id} name={friend.name}/>)}
        </div>
      </div>
    )
}

export default FriendsBlock