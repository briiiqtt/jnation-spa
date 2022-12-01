import React from 'react';
import CommentViewer from '../components/Board/CommentViewer';
import PostViewer from '../components/Board/PostViewer';

const Post = () => {
  return (
    <>
      <PostViewer />
      <CommentViewer />
    </>
  );
};

export default Post;
