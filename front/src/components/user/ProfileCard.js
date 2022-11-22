import { UserOutlined } from '@ant-design/icons';
import { Avatar, Skeleton } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTimeStampYYYYMMDD, graySpin } from '../common';
import NicknameBadge from './NicknameBadge';

const ProfileCard = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 24px',
          border: '1px solid #EAEAEE',
          overflow: 'hidden',
          height: '88px',
        }}
      >
        <Loaded />
      </div>
    </>
  );
};
export default ProfileCard;

const Loaded = () => {
  const isLoading = useSelector((state) => state.board.isLoading);
  const nickname = useSelector(
    (state) => state.board.currentPost.authorNickname
  );
  const auth = useSelector((state) => state.board.currentPost.authorAuth);
  const uid = useSelector((state) => state.board.currentPost.authorUID);
  const createdAt = useSelector(
    (state) => state.board.currentPost.authorCreatedAt
  );
  return (
    <>
      <div style={{ marginRight: '16px' }}>
        <Avatar size={46} icon={<UserOutlined />} />
      </div>
      <div>
        <div>
          <NicknameBadge nickname={nickname} auth={auth} />
        </div>
        {isLoading || (
          <div style={{ fontSize: '0.8rem' }}>
            <span>{uid}</span>&emsp;|&emsp;
            <span>{getTimeStampYYYYMMDD(createdAt)}</span>
          </div>
        )}
      </div>
    </>
  );
};
