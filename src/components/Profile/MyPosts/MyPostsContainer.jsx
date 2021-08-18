import React from 'react'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

// const MyPostsContainer = (props) => {

//   let state = props.store.getState()

//   let addPost = () => {
//     props.store.dispatch(addPostActionCreator())
//   }

//   let onPostChange = (text) => {
//     props.store.dispatch(updateNewPostTextActionCreator(text))
//   }

//   return(<MyPosts unpdateNewPostText={onPostChange} addPost={addPost} 
//                   posts={state.profilePage.posts}
//                   newPostText={state.profilePage.newPostText}/>)
// }

let mapStateToProps = (state) => {

  return{
    profilePage: state.profilePage
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer