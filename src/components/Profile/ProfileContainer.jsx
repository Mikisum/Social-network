import React from 'react'
import { connect } from 'react-redux'
import { getUsersProfile, getUsersStatus, updateUsersStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Profile from './Profile'

class ProfileInfoContainer extends React.Component{
  componentDidMount() {
    
    let userId = this.props.match.params.userId

    if(!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUsersProfile(userId)
    this.props.getUsersStatus(userId)
  }

    render (){
      return (
        <Profile {...this.props}
                  isOwner={!this.props.match.params.userId}
                  profile={this.props.profile} 
                  status={this.props.status} 
                  updateUsersStatus={this.props.updateUsersStatus}
                  savePhoto={this.props.savePhoto}/>
      )
    }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, {getUsersProfile, getUsersStatus, updateUsersStatus, savePhoto, saveProfile}),
  withRouter,
)(ProfileInfoContainer)