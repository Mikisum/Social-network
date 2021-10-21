import React from 'react'
import { NavLink } from 'react-router-dom'
import { DialogType } from '../../../../types/types'
import classes from './DialogItem.module.css'

const DialogItem = (props: DialogType) => {

  let path = "/dialogs/" + props.id

  return (
    <li className={classes.dialogItem}>
      <NavLink activeClassName={classes.activeLink} to={path}>{props.name}</NavLink>
    </li>
  )
}

export default DialogItem