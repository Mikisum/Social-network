import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { useHistory, useParams } from 'react-router'
import { actionsProfile, getUsersProfile, getUsersStatus, saveProfile } from '../../redux/profileReducer'
import { actions } from '../../redux/auth-reducer'
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
  
  const [isOwner, setIsOwner] = useState(false)
  let { userId } = useParams<PathParamsType>()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    
    if(!userId) {
      if(localStorage.data){
        setIsOwner(true)
        let { userId, email, login } = JSON.parse(localStorage.data)

        dispatch(actions.setAuthUserData(+userId, email, login, true))
        dispatch(getUsersProfile(+userId))
        dispatch(getUsersStatus(+userId))
        return
      } else {
        history.push('/login')
      }
    }
    dispatch(getUsersProfile(+userId))
    dispatch(getUsersStatus(+userId))
  },[localStorage,userId, isOwner])
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
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
        <ProfileHeader isOwner={isOwner}/>
        <Row>
          {editMode
          
            ?<ProfileDataFormRedux profile={profile} onSubmit={onSubmit} initialValues={profile}/> 
            : <ProfileData 
                isOwner={isOwner}
                profile={profile} 
              />}  
        </Row>
      </Layout>
    )
}

export default Profile