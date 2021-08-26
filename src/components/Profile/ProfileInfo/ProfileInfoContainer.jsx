import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import ProfileInfo from './ProfileInfo'
import { setUserProfile } from './../../../redux/profileReducer'
import { withRouter } from 'react-router-dom'

class ProfileInfoContainer extends React.Component{
  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 2
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    .then(res => {
      this.props.setUserProfile(res.data)
    })
  }

    render (){
      return (
        <ProfileInfo {...this.props} profile={this.props.profile}/>
      )
    }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
})

let withUrlDataContainerComponent = withRouter(ProfileInfoContainer)


export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent)