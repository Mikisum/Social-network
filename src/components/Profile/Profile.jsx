import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import classes  from './Profile.module.css'
import ProfileView from './ProfileView/ProfileView'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import FriendsBlock from './SideBar/FriendsBlock/FriendsBlock'


const Profile = (props) => {
const {posts, friends} = props
    return (
      <div className={classes.profile}>
        <ProfileView />
        <ProfileInfo />
        <FriendsBlock friends={friends}/>
        <MyPosts posts={posts}/>
      </div>
    )
}

export default Profile