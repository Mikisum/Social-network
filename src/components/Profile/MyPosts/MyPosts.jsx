import React from 'react';
import classes  from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {
    return (
    <div className={classes.content}>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'></img>
      <div>
        ava + description
      </div>
      <div>
        My posts
        <div>
          <textarea></textarea>
          <button>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        <Post message='hey' count='10'/>
        <Post message='What?' count='17'/>
      </div>
      </div>
    )
}

export default MyPosts;