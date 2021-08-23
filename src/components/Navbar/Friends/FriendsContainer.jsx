import { connect } from 'react-redux'
import Friends from './Friends'

const mapStateToProps = (state) => {
  return {
    friends: state.friendsPage.friends,
  }
}

const mapDispatchToProps = (dispatch) => {
  
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)
  
export default FriendsContainer