import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionsProfile } from '../../../../redux/profileReducer'
import { AppStateType } from '../../../../redux/redux-store'
import { ProfileType } from '../../../../types/types'
import { ProfileForm } from './ProfileForm'

type ProfileAboutPropsType = {
  profile: ProfileType
  isOwner: boolean
}

export const ProfileAbout: FC<ProfileAboutPropsType> = ({ isOwner, profile }) => {
  const dispatch = useDispatch()
  const editMode = useSelector((state: AppStateType) => state.profilePage.editMode)

  const goToEditMode = () => {
    // setModalVisible(true)
    dispatch(actionsProfile.setEditMode(true))
  }

  return (
    <>
      <Card title='Looking for a job' extra={isOwner && <EditOutlined onClick={goToEditMode} />} style={{ marginBottom: '15px' }}>
        {profile.lookingForAJob ? 'Yes' : 'No'}
      </Card>
      {editMode && <ProfileForm />}
      <Card title='About' extra={isOwner && <EditOutlined onClick={goToEditMode} />} style={{ marginBottom: '15px' }}>
        <Meta description={profile.aboutMe} />
      </Card>
      <Card title='My Professional skills' extra={isOwner && <EditOutlined onClick={goToEditMode} />} style={{ marginBottom: '15px' }}>
        <Meta description={profile.lookingForAJobDescription} />
      </Card>
    </>
  )
}
