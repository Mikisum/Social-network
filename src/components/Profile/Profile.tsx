import classes  from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
  profile:ProfileType | null
  saveProfile: (profile: ProfileType) => any
  status: string
  updateUsersStatus: (status: string) => void
  isOwner: boolean
  savePhoto: () => void
}

const Profile: FC<PropsType> = (props) => {

    return (
      <div className={classes.profile}>
        <ProfileInfo profile={props.profile} 
                      saveProfile={props.saveProfile}
                      status={props.status} 
                      updateUsersStatus={props.updateUsersStatus}
                      isOwner={props.isOwner}
                      savePhoto={props.savePhoto}/>
        <MyPostsContainer/>
      </div>
    )
}

export default Profile