import { Avatar, Col, Row, Typography } from 'antd'
import { ChangeEvent, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avatar.png'
import camera from '../../assets/photo-camera.png'
import { savePhoto } from '../../redux/profileReducer'
import { AppStateType } from '../../redux/redux-store'
import { ProfileStatus } from './ProfileContent/PtofileStatus/ProfileStatus'
import classes from './ProfileHeader.module.css'

const { Title } = Typography

type PropsType = {
  isOwner: boolean
}

export const ProfileHeader: FC<PropsType> = ({ isOwner }) => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const dispatch = useDispatch()

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }

  return (
    <>
      <Row className={classes.header} align='middle' justify='space-between'>
        <Col xs={24} sm={24} md={6} offset={1}>
          <Row justify='center' align='middle' className={classes.avatarBox}>
            <Col className={classes.ava}>
              <Avatar src={profile?.photos.small || avatar} size={164} className={classes.avatar}></Avatar>
              {isOwner && (
                <div className={classes.imageUpload}>
                  <label>
                    <img className={classes.camera} src={camera}></img>
                  </label>
                  <input type='file' className={classes.photo} onChange={mainPhotoSelected} />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={classes.name}>
        <Col xs={24} md={6} offset={1}>
          <Row justify='center'>
            <Title level={2} className={classes.title}>
              {profile?.fullName}
            </Title>
          </Row>
        </Col>
        <Col xs={24} md={18}>
          <Row justify='center' style={{ wordWrap: 'break-word' }}>
            <ProfileStatus isOwner={isOwner} />
          </Row>
        </Col>
      </Row>
    </>
  )
}
