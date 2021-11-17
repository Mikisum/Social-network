import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsersStatus } from '../../../../redux/profileReducer'
import { AppStateType } from '../../../../redux/redux-store'

const ProfileStatusWithHooks: FC = () => {
  
  const stateStatus = useSelector((state: AppStateType) => state.profilePage.status)
  const dispatch = useDispatch()

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(stateStatus)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    dispatch(updateUsersStatus(status))
  }

  const onStatusChange = (e:ChangeEvent<HTMLInputElement> ) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      { !editMode &&
        <div>
          <b>Status</b>: <span onClick={activateEditMode}>{status || '---'}</span>
        </div>
      }
      {editMode &&
        <div>
          <input 
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