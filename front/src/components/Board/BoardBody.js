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
          onClick={() => onListItemClick(item.post_uid)}
          actions={[
            <>
              <EyeFilled />
              &nbsp;
              {isLoading ? 0 : item.view_count || 0}
            </>,
            <>
              <CommentOutlined />
              &nbsp;
              {isLoading ? 0 : item.comment_count || 0}
            </>,
          ]}
        >
          <Skeleton
            active
            key={item.post_uid}
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
                  {item.nickname}&emsp;|&emsp;
                  {getTimeStamp(item.post_created_at)}
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
