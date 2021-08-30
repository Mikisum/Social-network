import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { followAC, setCurrentPageAC, setUsersAC, toggleIsFetchingAC, unfollowAC } from '../../../redux/usersReducer'
import Users from './Users'
import Preloader from '../../common/preloader/preloader'

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, 
      { withCredentials: true})
    .then(res => {
      this.props.toggleIsFetching(false)
      this.props.setUsers(res.data.items)
    })
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true)
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, 
    { withCredentials: true})
    .then(res => {
      this.props.toggleIsFetching(false)
      this.props.setUsers(res.data.items)
    })
  } 

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users 
        totalUsersCount={this.props.totalUsersCount} 
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
      />
      </>
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage))
    },
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching))
    }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)