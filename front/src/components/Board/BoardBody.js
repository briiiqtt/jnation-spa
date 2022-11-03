import { CommentOutlined, EyeFilled } from '@ant-design/icons';
import { Avatar, List, Skeleton } from 'antd';
import React from 'react';

const BoardBody = ({posts}) => {

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          actions={
            item.comments.length > 0
              ? [
                  <span key="">
                    <EyeFilled />
                    &nbsp;
                    {item.viewCnt}
                  </span>,
                  <span key="">
                    <CommentOutlined />
                    &nbsp;
                    {item.comments.length}
                  </span>,
                ]
              : [
                  <span key="">
                    <EyeFilled />
                    &nbsp;
                    {item.viewCnt}
                  </span>,
                ]
          }
        >
          <Skeleton avatar title={true} loading={false} active>
            <List.Item.Meta
              avatar={
                item.imgs.length > 0 && (
                  <Avatar src={''} shape="square" size={'large'} />
                )
              }
              title={<div>{item.title}</div>}
              description={<div>{item.author}&emsp;|&emsp;{item.createdAt}</div>}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default BoardBody;
