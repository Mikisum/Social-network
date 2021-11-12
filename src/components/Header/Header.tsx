import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import classes from './Header.module.css'

const Header: FC= () => {

  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)

  const login = useSelector((state: AppStateType) => state.auth.login)
  // const login = JSON.parse(localStorage.data).login

  // const login = localStorage.getItem('login')
  const dispatch = useDispatch()

  return (
    <header className={classes.header}>
      <div>
        <img src='https://ak.picdn.net/shutterstock/videos/19546093/thumb/1.jpg' alt=''></img>
      </div>
      <div className={classes.loginBlock}>
          {isAuth 
          ? <div>{login} - <button onClick={() => dispatch(logout())}>Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header