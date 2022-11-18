import { Skeleton } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import {
  action_getPosts,
  action_setBoard,
  action_setPosts,
} from '../../reducers/boardReducer';

import BoardBar from './BoardBar';
import BoardBody from './BoardBody';
import Pagin from './Pagin';

const Board = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.board.page);
  const pageSize = useSelector((state) => state.board.pageSize);
  const _boardUID = useParams().boardUID;

  useEffect(() => {
    dispatch(action_getPosts({ boardUID: _boardUID, page, pageSize }));
    dispatch(action_setBoard({ boardUID: _boardUID }));

    return () => {
      // dispatch(
      //   action_setPosts({
      //     post: { posts: [], count: 0 },
      //   })
      // );
    };
  }, [location]);

  return (
    <>
      <div style={{ padding: '20px' }}>
        {/* <MustRead/> */}
        <BoardBar />
        <Pagin />
        <BoardBody />
        <Pagin />
      </div>
    </>
  );
};

export default Board;
