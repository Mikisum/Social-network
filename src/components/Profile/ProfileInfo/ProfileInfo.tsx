import { ChangeEvent, FC, useState } from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './PtofileStatus/ProfileStatusWithHooks'
import avatar from './../../../assets/avatar.png'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { actions, savePhoto, saveProfile } from '../../../redux/profileReducer'
import { Avatar, Row, Card, Col } from 'antd'
import { ProfileHeader } from './ProfileHeader'

type PropsType = {
  isOwner: boolean
}

const ProfileInfo: FC<PropsType> = ({ isOwner }) => {

  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const editMode = useSelector((state: AppStateType) => state.profilePage.editMode)
  const dispatch = useDispatch()

  if (!profile) {
    return <Preloader/>
  }

  const onSubmit = (formData: ProfileType) => {
    dispatch(saveProfile(formData))
    dispatch(actions.setEditMode(false))
  }

    return (
      <>
      <ProfileHeader isOwner={isOwner}/>
      <Row>
        {editMode
        
          ?<ProfileDataForm profile={profile} onSubmit={onSubmit} initialValues={profile}/> 
          : <ProfileData 
              isOwner={isOwner}
              profile={profile} 
            />}  
        <ProfileStatusWithHooks />
      </Row>
      </>
    )
}

type ProfileDataPropsType = {
  profile: ProfileType,
  isOwner: boolean
}

const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner}) => {
  const tabList = [
    {
      key: 'about',
      tab: 'about',
    },
    {
      key: 'post',
      tab: 'post',
    },
  ];
  const contentList = {
    about: <p>content1</p>,
    post: <p>content2</p>,
  };

  const dispatch = useDispatch()
  const goToEditMode = () => {
    dispatch(actions.setEditMode(true))
  }

  return (
    <Card
      tabList={tabList}>
      <Row>
        <Col span={20}><h3>Profile info</h3></Col>
        <Col>{isOwner && <div><button onClick={goToEditMode}>edit</button></div>}</Col>
      </Row>
      
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
    </Card>
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