import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { useHistory, useParams } from 'react-router'
import { actionsProfile, getUsersProfile, getUsersStatus, saveProfile } from '../../redux/profileReducer'
import Preloader from '../common/preloader/preloader'
import { ProfileType } from '../../types/types'
import { ProfileHeader } from './ProfileHeader'
import { Layout, Row } from 'antd'
import { ProfileData } from './ProfileContent/ProfileData/ProfileData'
import ProfileDataFormRedux from './ProfileContent/ProfileData/ProfileDataForm'

type PathParamsType = {
  userId: string
}

type PropsType = {}

const Profile: FC<PropsType> = () => {
  
  let { userId } = useParams<PathParamsType>()
  const history = useHistory()
  const dispatch = useDispatch()
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  useEffect(() => { 
    
    if(!userId) {
      
      if(isAuth){

        let { userId } = JSON.parse(localStorage.data)

        dispatch(getUsersProfile(+userId))
        dispatch(getUsersStatus(+userId))
      } else {
        history.push('/login')
      }
      return 
    }
    dispatch(getUsersProfile(+userId))
    dispatch(getUsersStatus(+userId))
    
  },[userId,  isAuth])

  const editMode = useSelector((state: AppStateType) => state.profilePage.editMode)

  if (!profile) {
    return <Preloader/>
  }

  const onSubmit = (formData: ProfileType) => {
    dispatch(saveProfile(formData))
    dispatch(actionsProfile.setEditMode(false))
  }

    return (
      <Layout>
        <ProfileHeader isOwner={isAuth}/>
        <Row>
          {editMode
          
            ?<ProfileDataFormRedux profile={profile} onSubmit={onSubmit} initialValues={profile}/> 
            : <ProfileData 
                isOwner={isAuth}
                profile={profile} 
              />}  
        </Row>
      </Layout>
    )
}

export default Profile