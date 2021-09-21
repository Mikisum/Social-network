import React from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'
import ProfileStatus from './PtofileStatus/ProfileStatus'
import ProfileStatusWithHooks from './PtofileStatus/ProfileStatusWithHooks'

const ProfileInfo = ({ profile, status, updateUsersStatus }) => {
  if (!profile) {
    return <Preloader/>
  }
    return (
      <div className={classes.profileInfo}>
        <img src={profile.photos.large}/>
        <div>{profile.fullName}</div>
        <ProfileStatusWithHooks status={status} updateUsersStatus={updateUsersStatus}/>
      </div>
    )
}

export default ProfileInfo