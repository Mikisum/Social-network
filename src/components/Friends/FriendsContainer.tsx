import { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { requestFriends } from '../../redux/sideBarReducer'
import { UserType } from '../../types/types'
import Friends from './Friends'

type MapStatePropsType = {
  friends: Array<UserType>
  totalCount: number
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  requestFriends: () => void
}

class FriendsContainer extends Component<MapStatePropsType & MapDispatchPropsType> {
  componentDidMount() {
    this.props.requestFriends()
  }

  componentDidUpdate(prevProps: MapStatePropsType) {
    if (this.props.followingInProgress !== prevProps.followingInProgress) {
      this.props.requestFriends()
    }
  }
  render() {
    return <Friends {...this.props} />
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    friends: state.sideBar.friends,
    totalCount: state.sideBar.totalCount,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToProps, { requestFriends })(FriendsContainer)
