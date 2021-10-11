import React from 'react'
import classes  from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {

    return (
      <div className={classes.profile}>
        <ProfileInfo profile={props.profile} 
                      saveProfile={props.saveProfile}
                      status={props.status} 
                      updateUsersStatus={props.updateUsersStatus}
                      isOwner={props.isOwner}
                      savePhoto={props.savePhoto}/>
        {/* <FriendsBlock store={props.store}/> */}
        <MyPostsContainer/>
      </div>
    )
}

export default Profile