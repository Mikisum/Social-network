import { Component, ComponentType, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getUsersProfile, getUsersStatus, updateUsersStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { withRouter, match, useParams,useHistory } from 'react-router-dom'
import { compose } from 'redux'
import Profile from './Profile'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { History } from 'history';

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  getUsersProfile: (userId: number | null) => void
  getUsersStatus: (userId: number | null) => void 
  updateUsersStatus: (status: string) => void
  savePhoto: () => void
  saveProfile: (profile: ProfileType) => void
  match: match<PathParamsType>
  history: History
}

type PathParamsType = {
  userId: string
}
const Hook = () => {
  const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)
  let { userId } = useParams<PathParamsType>()
  const history = useHistory()
  const dispatch = useDispatch()
  const status = useSelector((state:AppStateType) => state.profilePage.status)
  useEffect(() => {
    if(!userId) {
      history.push('/login')
    }
    dispatch(getUsersProfile(+userId))
    dispatch(getUsersStatus(+userId))
  },[userId])

  return(
    <div>
      <h2>hello {userId}</h2>
      <h2>{status}</h2></div>
  )
}
type PropsType = MapStatePropsType & MapDispatchPropsType & PathParamsType

class ProfileInfoContainer extends Component<PropsType>{
  
  componentDidMount() {
    
    let userId: number| null = +this.props.match.params.userId

    if(!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUsersProfile(userId)
    this.props.history.push(`/profile/${userId}`)
    this.props.getUsersStatus(userId)
  }

    render (){
      return (
        <div>
        <Profile {...this.props}
                  isOwner={+this.props.userId !== this.props.authorizedUserId}
                  profile={this.props.profile} 
                  status={this.props.status} 
                  updateUsersStatus={this.props.updateUsersStatus}
                  savePhoto={this.props.savePhoto}/>
        <Hook/>          
        </div>
      )
    }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
  connect(
    mapStateToProps, {getUsersProfile, getUsersStatus, updateUsersStatus, savePhoto, saveProfile}
  ),
  withRouter,
)(ProfileInfoContainer)