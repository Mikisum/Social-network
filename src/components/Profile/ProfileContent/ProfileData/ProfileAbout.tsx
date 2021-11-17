import { Col, Row } from "antd"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { actionsProfile } from "../../../../redux/profileReducer"
import { ContactsType, ProfileType } from "../../../../types/types"

type ProfileAboutPropsType = {
  profile: ProfileType,
  isOwner: boolean
}

export const ProfileAbout: FC<ProfileAboutPropsType> = ({isOwner, profile}) => {
  const dispatch = useDispatch()

  const goToEditMode = () => {
    dispatch(actionsProfile.setEditMode(true))
  }
  return(
    <>
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
    </>   
  )
}

type ContactsPropsType = {
  contactTitle: string
  contactValue:string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div ><b>{contactTitle}</b>: {contactValue}</div>
}