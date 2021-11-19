import { Avatar, Col, Row } from "antd"
import { ChangeEvent, FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { savePhoto } from "../../redux/profileReducer"
import avatar from '../../assets/avatar.png'
import { AppStateType } from "../../redux/redux-store"
import classes from './ProfileHeader.module.css'
import { ProfileStatus } from "./ProfileContent/PtofileStatus/ProfileStatus"
import { Typography } from 'antd';
import { CameraTwoTone } from '@ant-design/icons';

const { Title } = Typography;

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
    <Row className={classes.header} align="bottom">
      <Col span={4} className={classes.avatarBox}>
        <Avatar src={profile?.photos.small || avatar}
                  size={128}
                  className={classes.avatar}><CameraTwoTone /></Avatar>
                  <CameraTwoTone  className={classes.camera}/>
      </Col>
      <Col>
        <Title  level={2} style={{color: '#fff'}}>{profile?.fullName}</Title>
        <ProfileStatus/>
        {isOwner && <input type='file' onChange={mainPhotoSelected}/>}
      </Col>
    </Row>
    )
}