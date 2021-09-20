import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/falidators'
import classes  from './MyPosts.module.css'
import Post from './Post/Post'

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
          placeholder={'add your post'}
          name={'newPostText'}
          component={Textarea}
          placeholder={'Post message'}
          validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

const MyPosts = React.memo(props => {
  console.log('render yo')
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
}) 

export default MyPosts