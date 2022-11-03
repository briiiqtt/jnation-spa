import { Link } from 'react-router-dom';
import React from 'react';

const Logo = () => {
  return (
    <Link
      to={__dirname}
      style={{
        cursor: 'pointer',
        position: 'absolute',
        zIndex: 2,
        right: '140px',
        top: '5px',
      }}
    >
      <span>
        <img src="https://sgimage.netmarble.com/images/netmarble/enn/20210407/tpew1617761984326.png"></img>
      </span>
    </Link>
  );
};

export default Logo;
