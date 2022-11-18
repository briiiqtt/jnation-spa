import { Pagination } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action_getPosts } from '../../reducers/boardReducer';

const Pagin = () => {
  const dispatch = useDispatch();
  const boardUID = useSelector((state) => state.board.uid);
  const postTotal = useSelector((state) => state.board.post.total);
  const pageSize = useSelector((state) => state.board.pageSize);
  const page = useSelector((state) => state.board.page);
  const onPageChange = useCallback((page, pageSize) => {
    dispatch(action_getPosts({ page, pageSize, boardUID }));
  });
  return (
    <>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <Pagination
          current={page}
          total={postTotal}
          showSizeChanger={false}
          showQuickJumper={false}
          pageSize={pageSize}
          onChange={(page, pageSize) => onPageChange(page, pageSize)}
        />
      </div>
    </>
  );
};

export default Pagin;
