import React from 'react'
import { connect } from 'react-redux';
import { requestFriends } from '../../redux/sideBarReducer';
import Friends from "./Friends";


class FriendsContainer extends React.Component {
  componentDidMount() {
    this.props.requestFriends(true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.friends !== prevProps.friends){
      this.props.requestFriends(true)
    }
  }
  render() {
    return <Friends {...this.props}/>
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.sideBar.friends
  }
}

export default connect(mapStateToProps, {requestFriends})(FriendsContainer)