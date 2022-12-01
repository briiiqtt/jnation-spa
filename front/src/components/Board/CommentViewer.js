import React from 'react';
import CommentAdder from './CommentAdder';
import CommentBody from './CommentBody';
import CommentTopper from './CommentTopper';

const CommentViewer = () => {
  return (
    <>
      <div style={{ padding: '30px 28px' }}>
        <CommentTopper />
        <CommentAdder />
        <CommentBody />
      </div>
    </>
  );
};
export default CommentViewer;
