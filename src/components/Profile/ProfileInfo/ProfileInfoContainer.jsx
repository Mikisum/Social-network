import React from 'react'
import { connect } from 'react-redux'
import ProfileInfo from './ProfileInfo'
import { getUsersProfile, getUsersStatus, updateUsersStatus } from './../../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

class ProfileInfoContainer extends React.Component{
  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 19307
    }
    this.props.getUsersProfile(userId)
    this.props.getUsersStatus(userId)
  }

    render (){
      return (
        <ProfileInfo profile={this.props.profile} status={this.props.status} updateUsersStatus={this.props.updateUsersStatus}/>
      )
    }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})

export default compose(
  connect(mapStateToProps, {getUsersProfile, getUsersStatus, updateUsersStatus}),
  withRouter,
  withAuthRedirect
)(ProfileInfoContainer)