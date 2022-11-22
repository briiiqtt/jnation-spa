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

const BoardBody = () => {
  const posts = useSelector((state) => state.board.post.posts);
  const isLoading = useSelector((state) => state.board.isLoading);
  const navigate = useNavigate();

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 900);
  }, []);

  const onListItemClick = useCallback((uid) => {
    navigate(`/board/post/${uid}`);
  });

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item, i) => (
        <List.Item
          onClick={() => onListItemClick(item.postUID)}
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
            avatar={{ shape: 'square' }}
            title={false}
            paragraph={{ rows: 2, width: ['50%', '35%'] }}
            style={{ height: '73px !important' }}
            loading={isLoading}
          >
            <List.Item.Meta
              avatar={
                (item.hasImage = true && (
                  <Avatar src={''} shape="square" size={'large'} />
                ))
              }
              title={<div>{item.title}</div>}
              description={
                <div>
                  {item.authorNickname}&emsp;|&emsp;
                  {getTimeStamp(item.postCreatedAt, now)}
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
