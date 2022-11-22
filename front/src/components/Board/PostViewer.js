import { Avatar, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { action_getPost } from '../../reducers/boardReducer';
import { graySpin, TextLoading } from '../common';
import ProfileCard from '../user/ProfileCard';
import PostTitle from './PostTitle';

const PostViewer = () => {
  const dispatch = useDispatch();
  const postUID = useParams().postUID;
  const boardName = useSelector((state) => state.board.name);
  const currentPost = useSelector((state) => state.board.currentPost);
  const isLoading = useSelector((state) => state.board.isLoading);

  useEffect(() => {
    dispatch(action_getPost({ postUID }));
  }, [postUID]);
  return (
    <>
      <div style={{ padding: '30px 28px' }}>
        <Skeleton active loading={isLoading} paragraph={{ rows: 10 }}>
          <div
            style={{ paddingBottom: '14px', borderBottom: '1px solid #A0A0A1' }}
          >
            <span>{boardName}</span>
          </div>
          <div style={{ padding: '0px 28px' }}>
            <PostTitle />
            <div
              style={{
                padding: '30px 0px 80px',
                borderBottom: '1px solid #f0f0f3',
              }}
            >
              {currentPost.content}
            </div>
            <Emotions />
            <ProfileCard />
          </div>
        </Skeleton>
      </div>
    </>
  );
};

const Emotions = () => {
  return (
    <>
      <div style={{ padding: '30px 0px 45px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Emotion emoji="🥰" />
          <Emotion emoji="🤣" />
          <Emotion emoji="😭" />
          <Emotion emoji="😡" />
        </div>
      </div>
    </>
  );
};

const Emotion = ({ emoji, isLoading = false }) => {
  const count = 0;
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a style={{ fontSize: '3rem', margin: '0px 10px' }}>{emoji}</a>
        <div>{isLoading ? graySpin() : count}</div>
      </div>
    </>
  );
};

export default PostViewer;
