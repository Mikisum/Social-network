import { Card } from "antd"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { actionsProfile } from "../../../../redux/profileReducer"
import { ProfileType } from "../../../../types/types"
import {EditOutlined} from '@ant-design/icons';
import Meta from "antd/lib/card/Meta"

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
    <Card title='Looking for a job' extra={isOwner && <EditOutlined onClick={goToEditMode}/>}>
      {profile.lookingForAJob? 'Yes' : 'No'}
    </Card>
    <Card title='About' extra={isOwner && <EditOutlined onClick={goToEditMode}/>}>
      <Meta
        description={profile.aboutMe}
      />
    </Card>
    <Card title='My Professional skills' extra={isOwner && <EditOutlined onClick={goToEditMode}/>}>
      <Meta
        description={profile.lookingForAJobDescription}
      />
    </Card>
    </>   
  )
}
