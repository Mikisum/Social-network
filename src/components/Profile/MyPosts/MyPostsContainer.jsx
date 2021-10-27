import { actions, addPostActionCreator } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'
import { compose } from 'redux'

let mapStateToProps = (state) => {

  return{
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    addPost: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MyPosts)