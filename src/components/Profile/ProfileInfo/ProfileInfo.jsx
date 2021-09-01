import React from 'react'
import Preloader from '../../common/preloader/preloader'
import classes  from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
  // if(!props.profile) {
  //   return <Preloader/>
  // }
    return (
      <div className={classes.profileInfo}>
        <div>{props.profile}</div>
      </div>
    )
}

export default ProfileInfo