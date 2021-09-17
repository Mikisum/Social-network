import React from 'react'
import { connect } from 'react-redux'
import { follow, setCurrentPage, unfollow, toggleIsDisabled, requestUsers} from '../../../redux/usersReducer'
import Users from './Users'
import Preloader from '../../common/preloader/preloader'
import { compose } from 'redux'
import { getCurrentPage, getIsDisabled, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../../redux/users-selectors'

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isDisabled: getIsDisabled(state)
  }
}

export default compose(
  connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleIsDisabled, getUsers: requestUsers})
)(UsersContainer)