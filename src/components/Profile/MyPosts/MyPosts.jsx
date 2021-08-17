import React from 'react'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/state'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'



const MyPosts = (props) => {

  const { posts, dispatch, newPostText } = props

  let postsElements = posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)
  
  let newPostElement = React.createRef()

  let addNewPost = () => {
    dispatch(addPostActionCreator())
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    dispatch(updateNewPostTextActionCreator(text))
  }

  return (
    <div className={classes.postsBlock} >
        <h3>My posts</h3>
        <div>
          <div>
            <textarea 
              ref={newPostElement}
              value={newPostText}
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