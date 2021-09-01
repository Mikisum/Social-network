import React from 'react'
import classes  from './ProfileInfo.module.css'

const ProfileInfo = (props) => {

    return (
      <div className={classes.profileInfo}>
        <div>{props.profile}</div>
      </div>
    )
}

export default ProfileInfo