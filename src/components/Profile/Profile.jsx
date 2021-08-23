import React from 'react'
import classes  from './Profile.module.css'
import ProfileView from './ProfileView/ProfileView'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import FriendsBlock from './SideBar/FriendsBlock/FriendsBlock'
import MyPostsContainer from './MyPosts/MyPostsContainer'


const Profile = () => {
    return (
      <div className={classes.profile}>
        {/* <ProfileView /> */}
        <ProfileInfo />
        {/* <FriendsBlock store={props.store}/> */}
        <MyPostsContainer/>
      </div>
    )
}

export default Profile