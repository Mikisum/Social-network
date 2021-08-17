import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import classes  from './Profile.module.css'
import ProfileView from './ProfileView/ProfileView'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import FriendsBlock from './SideBar/FriendsBlock/FriendsBlock'


const Profile = (props) => {

    return (
      <div className={classes.profile}>
        <ProfileView />
        <ProfileInfo />
        <FriendsBlock friends={props.sideBar.friends}/>
        <MyPosts 
          posts={props.profilePage.posts} 
          dispatch={props.dispatch}
          newPostText={props.profilePage.newPostText}
          />
      </div>
    )
}

export default Profile