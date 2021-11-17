import React, { FC } from 'react'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostFormik, { FormType } from './AddPostForm/AddPostFormik'
import { MapDispatchPropsType, MapStatePropsType } from './MyPostsContainer'


const MyPosts: FC<MapStatePropsType & MapDispatchPropsType> = props => {
    let postsElements = props.posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)

    return (
      <div className={classes.postsBlock} >
          <h3>My posts</h3>
          <AddPostFormik addPost={props.addPost}/>
        <div className={classes.posts}>
          {postsElements}
        </div>
      </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized