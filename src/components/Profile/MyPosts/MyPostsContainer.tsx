import { actions } from '../../../redux/profileReducer'
import MyPosts, { MapDispatchPropsType, MapStatePropsType } from './MyPosts'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/redux-store'

let mapStateToProps = (state: AppStateType) => {

  return{
    posts: state.profilePage.posts,
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})
)(MyPosts)