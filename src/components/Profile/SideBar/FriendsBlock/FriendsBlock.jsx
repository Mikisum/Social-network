import React from 'react'
import FriendItem from './FriendItem/FriendItem'
import classes  from './FriendsBlock.module.css'

const FriendsBlock = (props) => {

  let state = props.store.getState().sideBar

    return (
      <div className={classes.friendsBlock}>
        <h3 className={classes.title}>Friends</h3>
        <div className={classes.friends}>
          {state.friends.map( friend => <FriendItem key={friend.id} name={friend.name}/>)}
        </div>
      </div>
    )
}

export default FriendsBlock