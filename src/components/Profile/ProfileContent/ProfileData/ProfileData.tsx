import { Card } from "antd";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../redux/redux-store";
import { ProfileType } from "../../../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileAbout } from "./ProfileAbout";

type ProfileDataPropsType = {
  profile: ProfileType,
  isOwner: boolean
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
  )
}
