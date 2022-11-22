import { EyeFilled } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { action_getPost } from '../../reducers/boardReducer';
import { getDefaultTimeStamp } from '../common';
import NicknameBadge from '../user/NicknameBadge';

const PostViewer = () => {
  const dispatch = useDispatch();
  const postUID = useParams().postUID;
  const boardName = useSelector((state) => state.board.name);
  const currentPost = useSelector((state) => state.board.currentPost);
  // const authorAuth = useSelector((state) => state.board.currentPost.authorAuth);
  // const authorNickname = useSelector(
  //   (state) => state.board.currentPost.authorNickname
  // );

  useEffect(() => {
    dispatch(action_getPost({ postUID }));
  }, [postUID]);
  return (
    <>
      <div style={{ padding: '30px 28px' }}>
        <div
          style={{ paddingBottom: '14px', borderBottom: '1px solid #A0A0A1' }}
        >
          <span>{boardName}</span>
        </div>
        <div style={{ padding: '0px 28px' }}>
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
              name={currentPost.authorNickname}
            ></NicknameBadge>
            <span style={{ color: '#959595' }}>
              &emsp;|&emsp;
              <span>{getDefaultTimeStamp(currentPost.createdAt)}</span>
              &emsp;|&emsp;
              <span>
                <EyeFilled />
                &nbsp;
                {currentPost.viewCount}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostViewer;
