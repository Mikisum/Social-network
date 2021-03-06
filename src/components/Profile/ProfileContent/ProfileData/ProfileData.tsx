import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../redux/redux-store'
import { ContactsType, ProfileType } from '../../../../types/types'
import Friends from '../../../Friends/FriendsWithHooks'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileAbout } from './ProfileAbout'

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
}

const contactIcon = {
  github: <FontAwesomeIcon icon={['fab', 'github']} color='MediumOrchid' />,
  vk: <FontAwesomeIcon icon={['fab', 'vk']} color='MediumOrchid' />,
  facebook: <FontAwesomeIcon icon={['fab', 'facebook-f']} color='MediumOrchid' />,
  instagram: <FontAwesomeIcon icon={['fab', 'instagram']} color='MediumOrchid' />,
  twitter: <FontAwesomeIcon icon={['fab', 'twitter']} color='MediumOrchid' />,
  website: <FontAwesomeIcon icon={['fas', 'globe']} color='MediumOrchid' />,
  youtube: <FontAwesomeIcon icon={['fab', 'youtube']} color='MediumOrchid' />,
  mainLink: <FontAwesomeIcon icon={['fab', 'linkedin']} color='MediumOrchid' />
}

export const ProfileData: FC<ProfileDataPropsType> = ({ isOwner }) => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)

  const tabList = [
    {
      key: 'about',
      tab: 'about'
    },
    {
      key: 'post',
      tab: 'post'
    }
  ]

  const dispatch = useDispatch()

  const [activeTabKey, setActiveTabKey] = useState('about')

  const onTabChange = (key: any) => {
    setActiveTabKey(key)
  }

  const contentList = {
    about: <ProfileAbout isOwner={isOwner} profile={profile!} />,
    post: <MyPostsContainer />
  }

  return (
    <Row justify='space-between'>
      <Col xs={{ span: 24, order: 2 }} md={{ span: 6, order: 1 }}>
        <Card title='Contacts' extra={<a href='#'>More</a>} style={{ marginBottom: '15px' }}>
          {Object.keys(profile!.contacts).map((key) => {
            return <Contact contactTitle={key} contactValue={profile!.contacts[key as keyof ContactsType]} key={key} />
          })}
        </Card>
        <Friends />
      </Col>

      <Col xs={{ span: 24, order: 1 }} md={{ span: 18, order: 2 }}>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={(key) => {
            onTabChange(key)
          }}
        >
          {(contentList as any)[activeTabKey]}
        </Card>
      </Col>
    </Row>
  )
}

type ContactsPropsType = {
  contactTitle: any
  contactValue: string
}

const Contact: FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <>
      {contactValue && (
        <>
          {(contactIcon as any)[contactTitle]}
          <Text> {contactValue} </Text>
        </>
      )}
    </>
  )
}
