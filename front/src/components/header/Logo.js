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
          right: '137px',
          top: '5px',
        }}
      >
        <span>
          <img src="https://sgimage.netmarble.com/images/netmarble/enn/20210407/tpew1617761984326.png"></img>
        </span>
      </span>
    </Link>
  );
};

export default Logo;
