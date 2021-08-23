import React from 'react'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {

  let postsElements = props.posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)

  let onAddPost = () => {
    props.addPost()
  }

  let onPostChange = (e) => {
    let text = e.target.value
    props.updateNewPostText(text)
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
            <button onClick={ onAddPost } >Add post</button>
          </div>
        </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts