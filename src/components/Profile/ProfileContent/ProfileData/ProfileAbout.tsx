import { Col, Row, Typography } from "antd"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { actionsProfile } from "../../../../redux/profileReducer"
import { ContactsType, ProfileType } from "../../../../types/types"
import {EditOutlined} from '@ant-design/icons';
const { Text, Title } = Typography;

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
          <Col span={12}><Title level={4}>Profile info</Title></Col>
          {isOwner && 
          <Col><EditOutlined onClick={goToEditMode}/></Col>}
        </Row>
        <Row>
          <Col span={4}><Text strong>Full name: </Text></Col>
          <Col> {profile.fullName}</Col>
        </Row>
        <Row>
          <Col span={4}><Text strong>Looking for a job: </Text></Col>
          <Col> {profile.lookingForAJob ? 'yes' : 'no'}</Col>
        </Row>
        <Row>
          <Col span={4}><Text strong>My professional skills:  </Text></Col>
          <Col> {profile.lookingForAJobDescription}</Col>
        </Row>
        <Row>
          <Col span={4}><Text strong>About me: </Text></Col>
          <Col>{profile.aboutMe}</Col>
        </Row>
        <Row>
          <Col span={4} ><Text strong>Contacts: </Text></Col>
          <Col>
            {Object.keys(profile.contacts).map(key => {
              return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} key={key} />
            })}
          </Col>
        </Row>  
    </>   
  )
}

type ContactsPropsType = {
  contactTitle: string
  contactValue:string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return (
    <>
    {contactValue && <Text>{contactTitle}: {contactValue} </Text> }
    </>
  )
 
}