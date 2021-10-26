import { Component } from 'react'
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import sideBarReducer, { requestFriends } from '../../redux/sideBarReducer';
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


  // componentDidUpdate(prevProps) {
  //   if (prevProps.friends !== this.props.friends ){
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