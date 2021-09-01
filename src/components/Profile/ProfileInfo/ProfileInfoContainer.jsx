import React from 'react'
import { connect } from 'react-redux'
import ProfileInfo from './ProfileInfo'
import { getUsersProfile } from './../../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'

class ProfileInfoContainer extends React.Component{
  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 2
    }
    this.props.getUsersProfile(userId)
  }

    render (){
      return (
        <ProfileInfo profile={this.props.profile}/>
      )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileInfoContainer)

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)


export default connect(mapStateToProps, {getUsersProfile})(withUrlDataContainerComponent)