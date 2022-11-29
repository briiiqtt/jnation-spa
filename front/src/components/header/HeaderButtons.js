import { EditFilled } from '@ant-design/icons';
import React, { useMemo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotificDropdown from './NotificDropdown';
import ProfileDropdown from './ProfileDropdown';

import { action_login, action_logout } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Modal } from 'antd';

const HeaderButtons = () => {
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = useCallback(async (data) => {
    console.log(data);
    // dispatch(action_join(data));
  });
  const iconStyle = useMemo(() => ({
    fontSize: '1.5rem',
    position: 'relative',
    bottom: '8px',
    color: '#ffffff',
    // padding: '5px',
    margin: '0px 15px',
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
  const join = () => {
    navigate('/join');
  };
  const btnMouseEnter = useCallback((e) => {
    e.target.style.border = '3px solid #ffffff';
    e.target.style.fontWeight = 'bold';
  });
  const btnMouseLeave = useCallback((e) => {
    e.target.style.border = '1px solid #ffffff';
    e.target.style.fontWeight = 'normal';
  });
  const onPenButton = useCallback(() => {
    navigate(`/board/post/add`);
  });
  const login = useCallback(() => {
    setIsLoginModalOn(true);
    // function init() {
    //   gapi.load('auth2', function () {
    //     gapi.auth2.init();
    //     options = new gapi.auth2.SigninOptionsBuilder();
    //     options.setPrompt('select_account');
    //     // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
    //     options.setScope(
    //       'email profile openid https://www.googleapis.com/auth/user.birthday.read'
    //     );
    //     // 인스턴스의 함수 호출 - element에 로그인 기능 추가
    //     // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
    //     gapi.auth2
    //       .getAuthInstance()
    //       .attachClickHandler(
    //         'GgCustomLogin',
    //         options,
    //         onSignIn,
    //         onSignInFailure
    //       );
    //   });
    // }

    // function onSignIn(googleUser) {
    //   const access_token = googleUser.getAuthResponse().access_token;
    //   const key = 'AIzaSyD_iVPXO2lCCyYN2wx_LInFp7ur3gScmz4';
    //   fetch(
    //     `https://people.googleapis.com/v1/people/me?personFields=birthdays&key=${key}&access_token=${access_token}`
    //   );
    // }
    // function onSignInFailure(t) {
    //   console.log(t);
    // }
    // init();
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
          onClick={join}
        >
          회원가입
        </span>
      </span>
    </>
  );

  const loggedIn = (
    <>
      <span style={iconStyle}>
        <EditFilled style={{ cursor: 'pointer' }} onClick={onPenButton} />
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
    <>
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
      <Modal
        title="로그인"
        open={isLoginModalOn}
        onOk={onFinish}
        // onCancel={setIsLoginModalOn(false)}
      >
        <Form>
          <Form.Item label="아이디" labelCol={{ span: 3 }}>
            <Input />
          </Form.Item>
          <Form.Item label="비밀번호" labelCol={{ span: 3 }}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            {/* <Button /> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HeaderButtons;
