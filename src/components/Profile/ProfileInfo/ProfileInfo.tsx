import { ChangeEvent, FC, useState } from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './PtofileStatus/ProfileStatusWithHooks'
import avatar from './../../../assets/avatar.png'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  saveProfile: (profile: ProfileType) => Promise<any>
  savePhoto:(file: File) => void
  updateUsersStatus: (status: string) => void
}

const ProfileInfo: FC<PropsType> = ({ profile, status, updateUsersStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader/>
  }

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
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

        {editMode 
          ?<ProfileDataForm profile={profile} onSubmit={onSubmit} initialValues={profile}/> 
          : <ProfileData 
              profile={profile} 
              isOwner={isOwner} 
              goToEditMode={() => {setEditMode(true)}}
            />}  
        <ProfileStatusWithHooks status={status} updateUsersStatus={updateUsersStatus}/>
      </div>
    )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
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
          return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} key={key} />
        })}
      </div>
    </div>
  )
}

type ContactsPropsType = {
  contactTitle: string
  contactValue:string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo