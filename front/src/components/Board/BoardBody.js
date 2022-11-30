import {
  CommentOutlined,
  EllipsisOutlined,
  EyeFilled,
} from '@ant-design/icons';
import { Avatar, List, Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTimeStamp } from '../common';
import NicknameBadge from '../user/NicknameBadge';

const BoardBody = () => {
  const posts = useSelector((state) => state.board.post.posts);
  const isLoading = useSelector((state) => state.board.isLoading);
  const navigate = useNavigate();

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // setInterval(() => {
    //   setNow(new Date());
    // }, 900);
  }, []);

  const onPostTitleClick = useCallback((uid) => {
    navigate(`/board/post/${uid}`);
  });

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={posts}
      size="large"
      renderItem={(item, i) => (
        <List.Item
          style={{ height: '86px !important' }}
          actions={[
            <>
              <EyeFilled />
              &nbsp;
              {isLoading ? 0 : item.viewCount}
            </>,
            <>
              <CommentOutlined />
              &nbsp;
              {isLoading ? 0 : item.commentCount}
            </>,
          ]}
        >
          <Skeleton
            active
            key={item.postUID}
            avatar={<Avatar shape="square" size={48} />}
            title={false}
            paragraph={{ rows: 2, width: ['50%', '35%'] }}
            loading={isLoading}
          >
            <List.Item.Meta
              avatar={
                (item.hasImage = true && (
                  <Avatar src={''} shape="square" size={48} />
                ))
              }
              title={
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => onPostTitleClick(item.postUID)}
                >
                  {item.title}
                </span>
              }
              description={
                <div style={{ color: '#3b3b3b' }}>
                  <NicknameBadge
                    nickname={item.authorNickname}
                    auth={item.authorAuth}
                    uid={item.authorUID}
                  />
                  <span style={{ color: '#a4a4a4', padding: ' 0px 10px' }}>
                    {getTimeStamp(item.postCreatedAt, now)}
                  </span>
                </div>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default BoardBody;
