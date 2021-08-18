import React from 'react'
import classes  from './Profile.module.css'
import ProfileView from './ProfileView/ProfileView'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import FriendsBlock from './SideBar/FriendsBlock/FriendsBlock'
import MyPostsContainer from './MyPosts/MyPostsContainer'


const Profile = (props) => {

    return (
      <div className={classes.profile}>
        <ProfileView />
        <ProfileInfo />
        <FriendsBlock store={props.store}/>
        <MyPostsContainer store={props.store}/>
      </div>
    )
}

export default Profile