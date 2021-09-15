import React from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'
import ProfileStatus from './PtofileStatus/ProfileStatus'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
    return (
      <div className={classes.profileInfo}>
        <div>{props.profile.fullName}</div>
        <ProfileStatus status={props.status} updateUsersStatus={props.updateUsersStatus}/>
      </div>
    )
}

export default ProfileInfo