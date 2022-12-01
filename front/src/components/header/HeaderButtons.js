import { ConsoleSqlOutlined, EditFilled } from '@ant-design/icons';
import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotificDropdown from './NotificDropdown';
import ProfileDropdown from './ProfileDropdown';

import { action_login, action_logout } from '../../reducers/userReducer';
import { Button, Form, Input, Modal } from 'antd';
import { Link } from '../common';

const HeaderButtons = () => {
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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
          {isLoggedIn ? (
            <LoggedInButtons
              setIsLoginModalOn={setIsLoginModalOn}
              isLoginModalOn={isLoginModalOn}
            />
          ) : (
            <NotLoggedInButtons
              setIsLoginModalOn={setIsLoginModalOn}
              isLoginModalOn={isLoginModalOn}
            />
          )}
          <LoginModal
            setIsLoginModalOn={setIsLoginModalOn}
            isLoginModalOn={isLoginModalOn}
          />
        </span>
      </div>
    </>
  );
};

export default HeaderButtons;

const LoggedInButtons = () => {
  const iconStyle = useMemo(() => ({
    fontSize: '1.5rem',
    position: 'relative',
    bottom: '8px',
    color: '#ffffff',
    // padding: '5px',
    margin: '0px 15px',
  }));
  return (
    <>
      <span style={iconStyle}>
        <Link href={`/board/post/add`}>
          <EditFilled style={{ cursor: 'pointer' }} />
        </Link>
      </span>
      <span style={iconStyle}>
        <NotificDropdown />
      </span>
      <span style={iconStyle}>
        <ProfileDropdown />
      </span>
    </>
  );
};

const NotLoggedInButtons = ({ setIsLoginModalOn, isLoginModalOn }) => {
  const login = useCallback(() => {
    console.log(isLoginModalOn);
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
  const outerSpanStyle = useMemo(() => ({
    width: '120px',
    textAlign: 'center',
    verticalAlign: 'middle',
  }));
  return (
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
        <Link href={'/join'}>
          <span
            style={btnStyle}
            onMouseEnter={btnMouseEnter}
            onMouseLeave={btnMouseLeave}
          >
            회원가입
          </span>
        </Link>
      </span>
    </>
  );
};

const LoginModal = ({ setIsLoginModalOn, isLoginModalOn }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const formRef = useRef();
  const me = useSelector((state) => state.user.me);
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);

  useEffect(() => {
    setIsValid('');
  }, [isLoginModalOn]);

  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState('');

  const eraseLoginForm = useCallback(() => {
    formRef.current.setFieldValue('pw', '');
  });

  const onFinish = useCallback(async (data) => {
    dispatch(action_login(data));
    eraseLoginForm();
  });

  useEffect(() => {
    isLoggedIn && setIsLoginModalOn(false);
    me === 'Unauthorized' && setIsValid('error');
  }, [isLoggingIn]);

  const onModalCancel = useCallback(() => {
    setIsLoginModalOn(false);
  });
  return (
    <>
      <Modal
        title="로그인"
        open={isLoginModalOn}
        footer={null}
        maskClosable
        // mask={false}
        onCancel={onModalCancel}
      >
        <Form labelCol={{ span: 5 }} onFinish={onFinish} ref={formRef}>
          <div style={{ minHeight: '150px', paddingRight: '50px' }}>
            <Form.Item
              label="아이디"
              name="id"
              hasFeedback
              validateStatus={isValid}
              rules={[
                {
                  required: true,
                  message: '아이디를 입력하세요.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="비밀번호"
              name="pw"
              hasFeedback
              validateStatus={isValid}
              extra={isValid === 'error' && '아이디 또는 비밀번호가 틀립니다.'}
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력하세요.',
                },
              ]}
            >
              <Input.Password name="pw" />
            </Form.Item>
          </div>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoggingIn}
              style={{ width: '25%' }}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
