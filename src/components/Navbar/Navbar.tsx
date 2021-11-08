import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'

const Navbar:FC = () => {
  return (
    <nav className={classes.nav}>
        <h3 className={classes.name}>Shortcuts</h3>
        <div className={classes.item}>
          <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
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