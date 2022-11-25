import { EditFilled } from '@ant-design/icons';
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotificDropdown from './NotificDropdown';
import ProfileDropdown from './ProfileDropdown';

import { action_login, action_logout } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const HeaderButtons = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const iconStyle = useMemo(() => ({
    fontSize: '1.5rem',
    position: 'relative',
    bottom: '8px',
    color: '#ffffff',
    // padding: '5px',
    margin: '0px 15px',
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
    const user = {
      id: 'hi',
      pw: 'pw',
    };
    // dispatch(action_login(user));
    function init() {
      gapi.load('auth2', function () {
        gapi.auth2.init();
        options = new gapi.auth2.SigninOptionsBuilder();
        options.setPrompt('select_account');
        // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
        options.setScope(
          'email profile openid https://www.googleapis.com/auth/user.birthday.read'
        );
        // 인스턴스의 함수 호출 - element에 로그인 기능 추가
        // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
        gapi.auth2
          .getAuthInstance()
          .attachClickHandler(
            'GgCustomLogin',
            options,
            onSignIn,
            onSignInFailure
          );
      });
    }

    function onSignIn(googleUser) {
      const access_token = googleUser.getAuthResponse().access_token;
      const key = 'AIzaSyD_iVPXO2lCCyYN2wx_LInFp7ur3gScmz4';
      fetch(
        `https://people.googleapis.com/v1/people/me?personFields=birthdays&key=${key}&access_token=${access_token}`
      );
    }
    function onSignInFailure(t) {
      console.log(t);
    }
    init();
  });

  const logout = useCallback(() => {
    dispatch(action_logout());
  });

  const notLoggedIn = (
    <>
      <span style={outerSpanStyle}>
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
          onClick={logout}
        >
          회원가입
        </span>
      </span>
    </>
  );
  const navigate = useNavigate();
  const onPenButton = useCallback(() => {
    navigate(`/board/post/add`);
  });

  const loggedIn = (
    <>
      <span style={iconStyle} onClick={onPenButton}>
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
