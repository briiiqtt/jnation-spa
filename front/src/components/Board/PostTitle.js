import { EyeFilled } from '@ant-design/icons';
import React from 'react';
import NicknameBadge from '../user/NicknameBadge';
import { getTimeStampYYYYMMDDhh24mm, graySpin, TextLoading } from '../common';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

const PostTitle = () => {
  const currentPost = useSelector((state) => state.board.currentPost);
  return (
    <>
      <div
        style={{
          fontSize: '1.75rem',
          paddingTop: '10px',
          fontWeight: 'bold',
        }}
      >
        {currentPost.title}
      </div>
      <div
        style={{
          padding: '1px 0px 10px',
          borderBottom: '1px solid #f0f0f3',
        }}
      >
        <NicknameBadge
          auth={currentPost.authorAuth}
          nickname={currentPost.authorNickname}
        ></NicknameBadge>
        <span style={{ color: '#959595' }}>
          &emsp;|&emsp;
          <span>{getTimeStampYYYYMMDDhh24mm(currentPost.createdAt)}</span>
          &emsp;|&emsp;
          <span>
            <EyeFilled />
            &nbsp;
            {currentPost.viewCount}
          </span>
        </span>
      </div>
    </>
  );
};
export default PostTitle;
