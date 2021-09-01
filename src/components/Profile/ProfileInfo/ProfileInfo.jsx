import React from 'react'
import classes  from './ProfileInfo.module.css'
import ProfileStatus from './PtofileStatus/ProfileStatus'

const ProfileInfo = (props) => {
    return (
      <div className={classes.profileInfo}>
        <div>{props.profile}</div>
        <ProfileStatus status={'Hello my friends'}/>
      </div>
    )
}

export default ProfileInfo