import React, {FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsersStatus } from '../../../../redux/profileReducer'
import { AppStateType } from '../../../../redux/redux-store'
import { Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

export const ProfileStatus: FC<PropsType> = ({isOwner}) => {

  const dispatch = useDispatch()

  const stateStatus = useSelector((state: AppStateType) => state.profilePage.status)

  const [status, setStatus] = useState(stateStatus);
  const updateStatus = (editVal: string) => {
    setStatus(editVal)
    dispatch(updateUsersStatus(editVal))
  }

  return (
 
      <Paragraph
        
        editable={isOwner && {
          icon: <EditOutlined   />,
          onChange: updateStatus,
          maxLength: 50,
          autoSize: { maxRows: 5, minRows: 1 },
        }}
      >
        {status || stateStatus}
      </Paragraph>
    
  );
};

type PropsType = {isOwner: boolean}
