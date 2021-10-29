import React, { FC } from 'react'
import { PostType } from '../../../types/types'
import { AddPostFormValuesType } from './AddPostForm/AddPostForm'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostForm from './AddPostForm/AddPostForm'

export type MapStatePropsType = {
  posts: Array<PostType>
}
export type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: FC<MapStatePropsType & MapDispatchPropsType> = props => {
    let postsElements = props.posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
      props.addPost(values.newPostText)
    }

    return (
      <div className={classes.postsBlock} >
          <h3>My posts</h3>
          <AddPostForm onSubmit={onAddPost}/>
        <div className={classes.posts}>
          {postsElements}
        </div>
      </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized