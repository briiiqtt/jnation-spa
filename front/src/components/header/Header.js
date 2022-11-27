import React, { useMemo } from 'react';
import HeaderButtons from '../header/HeaderButtons';
import Logo from './Logo';
import Searchbar from './Searchbar';

const Header = () => {
  const headerStyle = useMemo(() => ({
    width: '100%',
    height: '58px',
    position: 'fixed',
    backgroundColor: '#2d2121',
    zIndex: '1',
    display: 'flex',
    justifyContent: 'center',
  }));
  return (
    <>
      <div style={headerStyle}>
        <div style={{ position: 'relative' }}>
          <Logo />
        </div>
        <Searchbar />
        <div style={{ position: 'relative' }}>
          <HeaderButtons />
        </div>
      </div>
      <div
        style={{
          height: '58px',
        }}
      ></div>
    </>
  );
};
export default Header;
