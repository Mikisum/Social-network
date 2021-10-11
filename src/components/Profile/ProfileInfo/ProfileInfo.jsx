import React, { useState } from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './PtofileStatus/ProfileStatusWithHooks'
import avatar from './../../../assets/avatar.png'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'

const ProfileInfo = ({ profile, status, updateUsersStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader/>
  }

  const mainPhotoSelected = (e) => {
    if(e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
      }
    )
  }

    return (
      <div className={classes.profileInfo}>
        <img className={classes.avatar} src={profile.photos.large || avatar}/>
        {isOwner && <input type='file' onChange={mainPhotoSelected}/>}

        {editMode ? 
          <ProfileDataForm profile={profile} onSubmit={onSubmit} initialValues={profile}/> 
          : <ProfileData 
              profile={profile} 
              isOwner={isOwner} 
              goToEditMode={() => {setEditMode(true)}}
            />}  
        <ProfileStatusWithHooks status={status} updateUsersStatus={updateUsersStatus}/>
      </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      { profile.lookingForAJob && 
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
      }
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
          return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key}/>
        })}
      </div>
    </div>
  )
}



const Contact = ({contactTitle, contactValue}) => {
  return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo