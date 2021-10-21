import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

export type MapStatePropsType = {
  isAuth: boolean
  login: string | null
}

export type MapDispatchPropsType = {
  logout: () => void
}

const Header: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  return (
    <header className={classes.header}>
      <div>
        <img src='https://ak.picdn.net/shutterstock/videos/19546093/thumb/1.jpg' alt=''></img>
      </div>
      <div className={classes.loginBlock}>
          {props.isAuth 
          ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
          : <NavLink to={'./login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header