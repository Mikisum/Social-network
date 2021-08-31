import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { followAC, setCurrentPageAC, setUsersAC, toggleIsFetchingAC, unfollowAC, setTotalUsersCountAC, toggleIsDisabledAC, getUsersThunkCreator } from '../../../redux/usersReducer'
import Users from './Users'
import Preloader from '../../common/preloader/preloader'
import { usersAPI } from '../../API/api'

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsersThunkCreator()
    
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true)
    this.props.setCurrentPage(pageNumber)
    usersAPI.getUsers(pageNumber, this.props.pageSize)
    .then(data => {
      this.props.toggleIsFetching(false)
      this.props.setUsers(data.items)
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
        toggleIsDisabled={this.props.toggleIsDisabled}
        isDisabled={this.props.isDisabled}
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
    isFetching: state.usersPage.isFetching,
    isDisabled: state.usersPage.isDisabled
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
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount))
    },
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching))
    },
    toggleIsDisabled: (isFetching, userId) => {
      dispatch(toggleIsDisabledAC(isFetching, userId))
    },
    getUsersThunkCreator: (currentPage, pageSize) => {
      dispatch(getUsersThunkCreator(currentPage, pageSize))
    }
  }
}
  
export default connect(mapStateToProps, (mapDispatchToProps))(UsersContainer)