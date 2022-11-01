import { EditFilled } from '@ant-design/icons';
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotificDropdown from './NotificDropdown';
import ProfileDropdown from './ProfileDropdown';

import { action_login } from '../../reducers';

const HeaderButtons = () => {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  const dispatch = useDispatch();

  const onLoginBtn = useCallback(() => {
    dispatch(action_login({ id: 'id', name: 'name' }));
  });

  const iconStyle = useMemo(() => ({
    fontSize: '1.5rem',
    color: '#ffffff',
    padding: '5px',
    margin: '10px',
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

  const notLoggedIn = (
    <>
      <span style={outerSpanStyle} onClick={onLoginBtn}>
        <span
          style={btnStyle}
          onMouseEnter={btnMouseEnter}
          onMouseLeave={btnMouseLeave}
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

  const writeBtnClicked = useCallback(() => {
    // location.href = `${__dirname}post`;
  });

  const loggedIn = (
    <div>
      <span style={iconStyle} onClick={writeBtnClicked}>
        <EditFilled />
      </span>
      <span style={iconStyle}>
        <NotificDropdown />
      </span>
      <span style={iconStyle}>
        <ProfileDropdown />
      </span>
    </div>
  );

  return <>{isLoggedIn ? loggedIn : notLoggedIn}</>;
};

export default HeaderButtons;
