import { get } from 'https';
import { Component } from 'react'
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { requestFriends } from '../../redux/sideBarReducer';
import { getFollowingInProgress, getFriends } from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import Friends from "./Friends";
import { getFriends } from './friends-selectors';

type MapStatePropsType = {
  friends: Array<UserType>
}

type MapDispatchPropsType = {
  requestFriends: () => void
}

class FriendsContainer extends Component<MapStatePropsType & MapDispatchPropsType> {
  componentDidMount() {
    this.props.requestFriends()
  }

  // componentDidUpdate(prevProps: MapStatePropsType) {
  //   if (this.props.friends !== prevProps.friends){
  //     this.props.requestFriends()
  //   }
  // }
  render() {
    return <Friends {...this.props}/>
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    friends: state.sideBar.friends
  }
}

export default connect(mapStateToProps, {requestFriends})(FriendsContainer)