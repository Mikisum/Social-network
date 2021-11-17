import { Avatar, Row } from "antd"
import { ChangeEvent, FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { savePhoto } from "../../../redux/profileReducer"
import avatar from './../../../assets/avatar.png'
import { AppStateType } from "../../../redux/redux-store"

type PropsType = {
  isOwner: boolean
}

export const ProfileHeader: FC<PropsType> = ({isOwner}) => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const dispatch = useDispatch()
  let [editMode, setEditMode] = useState(false)

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }


  return (
    <Row>
      <Avatar src={profile?.photos.large || avatar}
              size={256}/>
      {isOwner && <input type='file' onChange={mainPhotoSelected}/>}
      
    </Row>
    )
}