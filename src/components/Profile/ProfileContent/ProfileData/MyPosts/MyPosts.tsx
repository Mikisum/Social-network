import React, { FC } from 'react'
import AddPostFormik from './AddPostForm/AddPostFormik'
import classes from './MyPosts.module.css'
import { MapDispatchPropsType, MapStatePropsType } from './MyPostsContainer'
import Post from './Post/Post'

const MyPosts: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const postsElements = props.posts.map((post) => <Post key={post.message} message={post.message} count={post.likesCount} />)

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddPostFormik addPost={props.addPost} />
      <div className={classes.posts}>{postsElements}</div>
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized
