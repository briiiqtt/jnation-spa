import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const NicknameBadge = ({ auth, nickname }) => {
  const num_auth = parseInt(auth);
  if (isNaN(num_auth) || num_auth > 9) {
    console.warn(auth, nickname);
    return <></>;
  }
  return (
    <>
      <span>
        <FontAwesomeIcon icon={`fa-solid fa-square-${auth}`} />
        <span>{nickname}</span>
      </span>
    </>
  );
};
export default NicknameBadge;
