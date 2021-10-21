import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header, { MapDispatchPropsType, MapStatePropsType } from './Header'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'

class HeaderContainer extends Component<MapStatePropsType & MapDispatchPropsType> {

  render () {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer)