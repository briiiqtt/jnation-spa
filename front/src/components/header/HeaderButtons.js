import { EditFilled } from '@ant-design/icons';
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotificDropdown from './NotificDropdown';
import ProfileDropdown from './ProfileDropdown';

import { action_login } from '../../reducers/users';

const HeaderButtons = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const onLoginBtn = useCallback(() => {
    dispatch(action_login({ id: 'id', name: 'name' }));
  });

  const iconStyle = useMemo(() => ({
    fontSize: '1.5rem',
    position: 'relative',
    bottom: '8px',
    color: '#ffffff',
    // padding: '5px',
    margin: '0px 20px',
    cursor: 'pointer',
  }));
  const outerSpanStyle = useMemo(() => ({
    width: '120px',
    textAlign: 'center',
    verticalAlign: 'middle',
  }));
  const btnStyle = useMemo(() => ({
    backgroundColor: '#2d2121',
    border: '1px solid white',
    padding: '3px 18px',
    color: 'white',
    margin: '0px 10px',
    cursor: 'pointer',
  }));

  const btnMouseEnter = useCallback((e) => {
    e.target.style.border = '3px solid #ffffff';
    e.target.style.fontWeight = 'bold';
  });
  const btnMouseLeave = useCallback((e) => {
    e.target.style.border = '1px solid #ffffff';
    e.target.style.fontWeight = 'normal';
  });

  const login = useCallback(() => {
    dispatch(action_login());
  });

  const notLoggedIn = (
    <>
      <span style={outerSpanStyle} onClick={onLoginBtn}>
        <span
          style={btnStyle}
          onMouseEnter={btnMouseEnter}
          onMouseLeave={btnMouseLeave}
          onClick={login}
        >
          로그인
        </span>
      </span>
      <span style={outerSpanStyle}>
        <span
          style={btnStyle}
          onMouseEnter={btnMouseEnter}
          onMouseLeave={btnMouseLeave}
        >
          회원가입
        </span>
      </span>
    </>
  );

  const loggedIn = (
    <>
      <span style={iconStyle}>
        <EditFilled />
      </span>
      <span style={iconStyle}>
        <NotificDropdown />
      </span>
      <span style={iconStyle}>
        <ProfileDropdown />
      </span>
    </>
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: '18px',
        left: '120px',
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoggedIn ? loggedIn : notLoggedIn}
      </span>
    </div>
  );
};

export default HeaderButtons;
