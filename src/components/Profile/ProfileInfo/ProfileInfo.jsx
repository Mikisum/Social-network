import React from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './PtofileStatus/ProfileStatusWithHooks'
import avatar from './../../../assets/avatar.png'

const ProfileInfo = ({ profile, status, updateUsersStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader/>
  }

  const mainPhotoSelected = (e) => {
    if(e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

    return (
      <div className={classes.profileInfo}>
        <img className={classes.avatar} src={profile.photos.large || avatar}/>
        {isOwner && <input type='file' onChange={mainPhotoSelected}/>}
        <div>{profile.fullName}</div>
        <ProfileStatusWithHooks status={status} updateUsersStatus={updateUsersStatus}/>
      </div>
    )
}

export default ProfileInfo