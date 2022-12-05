import React from 'react';
import { Link } from '../common';

const Logo = () => {
  return (
    <Link href={__dirname}>
      <span
        style={{
          cursor: 'pointer',
          position: 'absolute',
          zIndex: 2,
          right: '55px',
          top: '8px',
        }}
      >
        <span>
          <img
            src="http://13.124.184.111:50080/resources/title_00_230x50.png"
            style={{ width: '190px' }}
          ></img>
        </span>
      </span>
    </Link>
  );
};

export default Logo;
