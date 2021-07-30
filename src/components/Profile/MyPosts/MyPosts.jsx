import React from 'react'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {

  const { posts } = props

  let postsElements = posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)
   
  return (
    <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <div>
          <div>
            <textarea></textarea>
          </div>
          <div>
            <button>Add post</button>
          </div>
        </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts