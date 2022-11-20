import { Pagination } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { action_getPosts } from '../../reducers/boardReducer';

const Pagin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardUID = useSelector((state) => state.board.uid);
  const postTotal = useSelector((state) => state.board.post.total);
  const page = useSelector((state) => state.board.page);
  const onPageChange = useCallback((page) => {
    // history.pushState(null, null, `/board/${boardUID}/${page}`);
    // const popStateEvent = new PopStateEvent('popstate');
    // dispatchEvent(popStateEvent);
    navigate(`/board/${boardUID}/${page}`);
  });
  return (
    <>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <Pagination
          current={page}
          total={postTotal}
          showSizeChanger={false}
          showQuickJumper={false}
          onChange={(page) => onPageChange(page)}
        />
      </div>
    </>
  );
};

export default Pagin;
