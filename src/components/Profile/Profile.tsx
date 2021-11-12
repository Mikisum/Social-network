import classes  from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { FC } from 'react'

type PropsType = {
  isOwner: boolean
}

const Profile: FC<PropsType> = (props) => {
 
    return (
      <div className={classes.profile}>
        <ProfileInfo isOwner={props.isOwner}/>
        <MyPostsContainer/>
      </div>
    )
}

export default Profile