import { Component, ComponentType, FC, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getUsersProfile, getUsersStatus, updateUsersStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { withRouter, match, useParams,useHistory, NavLink } from 'react-router-dom'
import { compose } from 'redux'
import Profile from './Profile'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { History } from 'history';
import qs from "qs";
import { debug } from 'console'
import { actions } from '../../redux/auth-reducer'
// import { createBrowserHistory } from "history";

type PathParamsType = {
  userId: string
}

type PropsType = {}

const ProfileContainer: FC<PropsType> = (props) => {
  const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)

  let { userId } = useParams<PathParamsType>()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    
    if(!userId) {
      if(localStorage.data){

        let { userId, email, login } = JSON.parse(localStorage.data)

        dispatch(actions.setAuthUserData(+userId, email, login, true))
        dispatch(getUsersProfile(+userId))
        dispatch(getUsersStatus(+userId))
      } else {
        history.push('/login')
      }
    }
    dispatch(getUsersProfile(+userId))
    dispatch(getUsersStatus(+userId))
  },[localStorage,userId])


  // componentDidMount() {
    
  //   let userId: number| null = +this.props.match.params.userId

  //   if(!userId) {
  //     userId = this.props.authorizedUserId
  //     if (!userId) {
  //       this.props.history.push('/login')
  //     }
  //   }
  //   this.props.getUsersProfile(userId)
  //   this.props.history.push(`/profile/${userId}`)
  //   this.props.getUsersStatus(userId)
  // }

      return (
        <div>
          <Profile isOwner={+userId !== authorizedUserId}/>
        </div>
      )

}

export default ProfileContainer
