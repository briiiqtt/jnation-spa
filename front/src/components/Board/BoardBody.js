import {
  CommentOutlined,
  EllipsisOutlined,
  EyeFilled,
} from '@ant-design/icons';
import { Avatar, List, Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BoardBody = () => {
  const posts = useSelector((state) => state.board.post.posts);
  const isLoading = useSelector((state) => state.board.isLoading);

  const [now, setNow] = useState(() => new Date());

  // useEffect(() => {
  //   console.log(now);
  //   setNow(new Date());
  // }, [now]);
  /**
   *
   *
   *
   *
   *
   */

  const onListItemClick = useCallback((uid) => {
    alert(uid);
  });
  const getTimeStamp = useCallback((date) => {
    const now = new Date();
    const createdAt = new Date(date);
    if (now - 1000 * 60 * 60 * 24 < createdAt) {
      const secs = (now - createdAt) / 1000;
      const mins = secs / 60;
      const hours = mins / 24;
      return secs <= 60
        ? `${Math.floor(secs)}초 전`
        : mins <= 60
        ? `${Math.floor(mins)}분 전`
        : `${Math.floor(hours)}시간 전`;
    } else {
      return `${createdAt.getFullYear()}. ${
        createdAt.getMonth() + 1
      }. ${createdAt.getDate()}`;
    }
  });
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item, i) => (
        <List.Item
          onClick={() => onListItemClick(item.uid)}
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
            key={item.uid}
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
