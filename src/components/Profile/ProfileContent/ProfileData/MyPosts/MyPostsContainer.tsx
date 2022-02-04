import { connect } from 'react-redux'
import { compose } from 'redux'
import { actionsProfile } from '../../../../../redux/profileReducer'
import { AppStateType } from '../../../../../redux/redux-store'
import { PostType } from '../../../../../types/types'
import MyPosts from './MyPosts'

export type MapStatePropsType = {
  posts: Array<PostType>
}
export type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actionsProfile.addPost })
)(MyPosts)
