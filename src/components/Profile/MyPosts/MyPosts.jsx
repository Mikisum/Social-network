import React from 'react'
import { Field, reduxForm } from 'redux-form'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
          placeholder={'add your post'}
          name={'newPostText'}
          component={'textarea'}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

const MyPosts = (props) => {

  let postsElements = props.posts.map(post =><Post key={post.message} message={post.message} count={post.likesCount}/>)

  let onAddPost = (values) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={classes.postsBlock} >
        <h3>My posts</h3>
        <AddNewPostReduxForm onSubmit={onAddPost}/>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts