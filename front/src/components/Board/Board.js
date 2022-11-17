import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { action_getPosts } from '../../reducers/boardReducer';

import BoardBar from './BoardBar';
import BoardBody from './BoardBody';
import Pagin from './Pagin';

const Board = ({ d }) => {
  const dispatch = useDispatch();
  const boardName = useSelector((state) => state.board.boardName);
  const postCnt = useSelector((state) => state.board.post.cnt);
  const posts = useSelector((state) => state.board.post.posts);
  const { boardUID } = useParams();

  useEffect(() => {
    dispatch(action_getPosts(boardUID));
  }, []);

  return (
    <>
      <div style={{ padding: '20px' }}>
        {/* <MustRead/> */}
        <BoardBar boardName={boardName} postCnt={postCnt} />
        <Pagin postCnt={postCnt} />
        <BoardBody posts={posts} />
        <Pagin postCnt={postCnt} />
      </div>
    </>
  );
};

export default Board;
