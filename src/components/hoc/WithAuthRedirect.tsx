import React, { Component, ComponentType, FC } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
}as MapStatePropsType)

type MapStatePropsType = {
  isAuth: boolean
}

type MapDispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {

  const RedirectComponent:FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let {isAuth, ...restProps} = props

    if (!isAuth) return <Redirect to ='/login'/>
    
    return <WrappedComponent {...restProps as WCP}/>
  }

  let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(
    mapStateToPropsForRedirect, {})
  (RedirectComponent)

  return ConnectedAuthRedirectComponent

}