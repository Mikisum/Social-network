import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import classes  from './Profile.module.css'
import ProfileView from './ProfileView/ProfileView'
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = (props) => {
const {posts} = props
    return (
      <div className={classes.profile}>
        <ProfileView />
        <ProfileInfo />
        <MyPosts posts={posts}/>
      </div>
    )
}

export default Profile