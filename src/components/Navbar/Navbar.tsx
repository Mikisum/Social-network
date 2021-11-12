import { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import classes from './Navbar.module.css'

const Navbar:FC = () => {
  const userId = useSelector((state:AppStateType) => state.auth.userId)
  return (
    <nav className={classes.nav}>
        <h3 className={classes.name}>Shortcuts</h3>
        <div className={classes.item}>
          <NavLink to={`/profile/`} activeClassName={classes.activeLink}>Profile</NavLink>
        </div>
        <div className={classes.item}>
          <NavLink to="/dialogs" activeClassName={classes.activeLink}>Messages</NavLink>
        </div>
        <div className={classes.item}>
          <NavLink to="/users" activeClassName={classes.activeLink}>Users</NavLink>
        </div> 
        <div className={classes.item}>
          <NavLink to="/chat" activeClassName={classes.activeLink}>Chat</NavLink>
        </div>
        <div className={classes.item}>
          <NavLink to="/news" activeClassName={classes.activeLink}>News</NavLink>
        </div>
        <div className={classes.item}>
          <NavLink to="/music" activeClassName={classes.activeLink}>Music</NavLink>
        </div>
        <div className={classes.item}>
          <NavLink to="/settings" activeClassName={classes.activeLink}>Settings</NavLink>
        </div>
      </nav>
  )
}

export default Navbar