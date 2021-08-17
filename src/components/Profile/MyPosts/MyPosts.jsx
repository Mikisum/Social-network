import React from 'react'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {

  let postsElements = props.posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)

  let addNewPost = () => {
    props.dispatch(addPostActionCreator())
  }

  let onPostChange = (e) => {
    let text = e.target.value
    props.dispatch(updateNewPostTextActionCreator(text))
  }

  return (
    <div className={classes.postsBlock} >
        <h3>My posts</h3>
        <div>
          <div>
            <textarea 
              value={props.newPostText}
              onChange={onPostChange}/>
          </div>
          <div>
            <button onClick={ addNewPost } >Add post</button>
          </div>
        </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts