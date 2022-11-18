import { EditOutlined, HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { spin } from '../common';

const BoardBar = () => {
  const boardName = useSelector((state) => state.board.name);
  const postTotal = useSelector((state) => state.board.post.total);
  const isLoading = useSelector((state) => state.board.isLoading);
  const fontSize = useCallback((fs) => ({ fontSize: fs + 'px' }));
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <HomeOutlined style={{ ...fontSize(18), top: '30px' }} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {isLoading ? (
                spin
              ) : (
                <>
                  <span style={fontSize(18)}>{boardName}</span>
                  <span style={{ ...fontSize(15), color: 'gray' }}>
                    {`(${postTotal})`}
                  </span>
                </>
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <Link to="/board/post/add">
            <Button style={{ border: '1px solid gray' }}>
              <EditOutlined style={{ fontSize: '18px', padding: '0px' }} />
              글쓰기
            </Button>
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default BoardBar;
