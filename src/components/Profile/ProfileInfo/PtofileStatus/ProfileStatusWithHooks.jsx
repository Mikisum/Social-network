import React, { useState } from 'react'

const ProfileStatusWithHooks = (props) => {
  
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateUsersStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      { !editMode &&
        <div>
          <b>Status</b>: <span onClick={activateEditMode}>{props.status || '---'}</span>
        </div>
      }
      {editMode &&
        <div>
          <input 
            value={''}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={status}
            autoFocus
          />
        </div>
      } 
    </div>
  )
}

export default ProfileStatusWithHooks