import React from 'react'
import classes  from './Profile.module.css'
import ProfileView from './ProfileView/ProfileView'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import FriendsBlock from './SideBar/FriendsBlock/FriendsBlock'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer'


const Profile = () => {
    return (
      <div className={classes.profile}>
        {/* <ProfileView /> */}
        <ProfileInfoContainer />
        {/* <FriendsBlock store={props.store}/> */}
        <MyPostsContainer/>
      </div>
    )
}

export default Profile