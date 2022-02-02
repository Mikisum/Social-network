import { FacebookOutlined, GithubOutlined, GlobalOutlined, InstagramOutlined, LinkedinOutlined, SearchOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppStateType } from "../../../../redux/redux-store";
import { ContactsType, ProfileType } from "../../../../types/types";
import FriendsContainer from "../../../Friends/FriendsContainer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileAbout } from "./ProfileAbout";
import classes from './ProfileData.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Friends from "../../../Friends/FriendsWithHooks";

library.add(fab, fas)

type ProfileDataPropsType = {
  profile: ProfileType,
  isOwner: boolean
}

const contactIcon = 
  {
    github: <FontAwesomeIcon icon={['fab', 'github']} color="MediumOrchid" />,
    vk: <FontAwesomeIcon icon={['fab', 'vk']} color="MediumOrchid" />,
    facebook: <FontAwesomeIcon icon={['fab', 'facebook-f']} color="MediumOrchid" />,
    instagram:<FontAwesomeIcon icon={['fab', 'instagram']} color="MediumOrchid" />,
    twitter: <FontAwesomeIcon icon={['fab', 'twitter']} color="MediumOrchid" />,
    website: <FontAwesomeIcon icon={['fas', 'globe']} color="MediumOrchid" />,
    youtube: <FontAwesomeIcon icon={['fab', 'youtube']} color="MediumOrchid" />,
    mainLink: <FontAwesomeIcon icon={['fab', 'linkedin']} color="MediumOrchid" />,
  }



export const ProfileData: FC<ProfileDataPropsType> = ({ isOwner}) => { 

  const profile = useSelector((state: AppStateType) => state.profilePage.profile)

  const tabList = [
    {
      key: 'about',
      tab: 'about',
    },
    {
      key: 'post',
      tab: 'post',
    },
  ];

  const dispatch = useDispatch()

  const [activeTabKey, setActiveTabKey] = useState('about');
  
  const onTabChange = (key:any) => {
    setActiveTabKey(key);
  };

  const contentList = {
    about: <ProfileAbout isOwner={isOwner} profile={profile!}/>,
    post: <MyPostsContainer/>,
  };

  
  return (
    <>
    <Col>
      <Card title="Contacts" extra={<a href="#">More</a>}>
        {Object.keys(profile!.contacts).map(key => {
          return <Contact contactTitle={key} contactValue={profile!.contacts[key as keyof ContactsType]} key={key} />
        })}
      </Card>
      <Friends/>
    </Col>  

    <Col>  
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={key => {
          onTabChange(key);
        }}
      >
        {(contentList as any)[activeTabKey]}
        </Card>
      </Col>  
    </>
  )
}

type ContactsPropsType = {
  contactTitle: any
  contactValue:string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return (
    <>
    {contactValue && <>{(contactIcon as any)[contactTitle]}<Text> {contactValue} </Text></> }
    </>
  )
}