import React from 'react'
import { connect } from 'react-redux'
import ProfileInfo from './ProfileInfo'
import { getUsersProfile } from './../../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router-dom'

class ProfileInfoContainer extends React.Component{
  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 2
    }
    this.props.getUsersProfile(userId)
  }

    render (){
      if (!this.props.isAuth) return <Redirect to='/login' />
      return (
        <ProfileInfo profile={this.props.profile}/>
      )
    }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
})

let withUrlDataContainerComponent = withRouter(ProfileInfoContainer)


export default connect(mapStateToProps, {getUsersProfile})(withUrlDataContainerComponent)