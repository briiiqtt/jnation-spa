import { graySpin } from '../common';
import React, { useCallback } from 'react';
import {
  Icon1SquareFill,
  Icon2SquareFill,
  Icon3SquareFill,
  Icon4SquareFill,
  Icon5SquareFill,
  Icon6SquareFill,
  Icon7SquareFill,
  Icon8SquareFill,
  Icon9SquareFill,
} from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const NicknameBadge = ({ auth, nickname, uid }) => {
  // const isLoading = useSelector((state) => state.board.isLoading);
  const num_auth = parseInt(auth);
  // if (isNaN(num_auth) || num_auth > 9 || isLoading) {
  //   return graySpin();
  // }
  const onNicknameClick = useCallback((uid) => {
    alert(uid);
  });
  return (
    <>
      <span>
        {num_auth === 1 ? (
          <Icon1SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#5D94B7"
          />
        ) : num_auth === 2 ? (
          <Icon2SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#33BFA6"
          />
        ) : num_auth === 3 ? (
          <Icon3SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#6FBF2E"
          />
        ) : num_auth === 4 ? (
          <Icon4SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#FF7612"
          />
        ) : num_auth === 5 ? (
          <Icon5SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#FF2C45"
          />
        ) : num_auth === 6 ? (
          <Icon6SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#7B52FF"
          />
        ) : num_auth === 7 ? (
          <Icon7SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#7B52FF"
          />
        ) : num_auth === 8 ? (
          <Icon8SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#7B52FF"
          />
        ) : num_auth === 9 ? (
          <Icon9SquareFill
            style={{ position: 'relative', top: '2px' }}
            size={16}
            color="#7B52FF"
          />
        ) : null}
        &nbsp;
        <span onClick={() => onNicknameClick(uid)}>{nickname}</span>
      </span>
    </>
  );
};
export default NicknameBadge;
