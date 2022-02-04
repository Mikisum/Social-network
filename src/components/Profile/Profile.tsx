import { Layout } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { getUsersProfile, getUsersStatus } from '../../redux/profileReducer'
import { AppStateType } from '../../redux/redux-store'
import Preloader from '../common/preloader/preloader'
import { ProfileData } from './ProfileContent/ProfileData/ProfileData'
import { ProfileHeader } from './ProfileHeader'

type PathParamsType = {
  userId: string
}

type PropsType = {}

const Profile: FC<PropsType> = () => {
  const { userId } = useParams<PathParamsType>()
  const history = useHistory()
  const dispatch = useDispatch()
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (!userId) {
      if (isAuth) {
        const { userId } = JSON.parse(localStorage.data)
        setIsOwner(true)
        dispatch(getUsersProfile(+userId))
        dispatch(getUsersStatus(+userId))
      } else {
        history.push('/login')
      }
      return
    }
    dispatch(getUsersProfile(+userId))
    dispatch(getUsersStatus(+userId))
  }, [userId, isAuth])

  // const editMode = useSelector((state: AppStateType) => state.profilePage.editMode)

  if (!profile) {
    return <Preloader />
  }

  // const onSubmit = (formData: ProfileType) => {
  //   dispatch(saveProfile(formData))
  //   dispatch(actionsProfile.setEditMode(false))
  // }

  return (
    <Layout style={{ borderRadius: '8px' }}>
      <ProfileHeader isOwner={isOwner} />
      <ProfileData isOwner={isOwner} profile={profile} />
      {/* {editMode
        
          ?<ProfileDataFormRedux profile={profile} onSubmit={onSubmit} initialValues={profile}/> 
          : <ProfileData 
              isOwner={isOwner}
              profile={profile} 
            />}   */}
    </Layout>
  )
}

export default Profile
