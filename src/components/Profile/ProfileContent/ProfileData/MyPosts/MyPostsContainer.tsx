import { actionsProfile } from '../../../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { PostType } from '../../../../../types/types'

export type MapStatePropsType = {
  posts: Array<PostType>
}
export type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType) => {

  return{
    posts: state.profilePage.posts,
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actionsProfile.addPost})
)(MyPosts)