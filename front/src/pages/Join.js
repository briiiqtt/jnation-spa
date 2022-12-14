import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { action_join, action_logout } from '../reducers/userReducer';
const JoinPage = () => {
  return (
    <>
      <CenteredHeader />
      <JoinForm />
    </>
  );
};
export default JoinPage;

const CenteredHeader = () => {
  const navigate = useNavigate();
  const headerStyle = useMemo(() => ({
    width: '100%',
    height: '58px',
    backgroundColor: '#2d2121',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const toMain = useCallback(() => {
    navigate('/');
  });

  return (
    <>
      <div style={headerStyle}>
        <span onClick={toMain} style={{ cursor: 'pointer' }}>
          <img
            src="http://13.124.184.111:50080/resources/title_00_230x50.png"
            style={{ height: '40px' }}
          ></img>
        </span>
      </div>
    </>
  );
};

const JoinForm = () => {
  const navigate = useNavigate();
  const isJoining = useSelector((state) => state.user.isJoining);
  const me = useSelector((state) => state.user.me);
  const [joinFinished, setJoinFinished] = useState(false);
  const dispatch = useDispatch();
  const onFinish = useCallback(async (data) => {
    dispatch(action_join(data));
  });
  const onFinishFailed = useCallback((data) => {
    console.error(data);
  });

  useEffect(() => {
    if (me?.nickname) {
      setJoinFinished(true);
    }
  }, [isJoining]);

  const toMain = useCallback(() => {
    dispatch(action_logout());
    navigate('/');
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          padding: '100px',
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          initialValues={
            {
              // remember: true,
            }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Id />
          <PW />
          <PWConfirm />
          <Nickname />
          <Form.Item
            wrapperCol={{
              offset: 11,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isJoining}>
              ????????????
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="???????????? ??????"
          open={joinFinished}
          onOk={toMain}
          // onCancel={toMain}
        >
          <p>{me?.nickname}???, ???????????????.</p>
          <p>???????????? ?????????({me?.id})??? ?????????????????????.</p>
        </Modal>
      </div>
    </>
  );
};

const PWConfirm = () => {
  const [isValid, setIsValid] = useState('');
  return (
    <>
      <Form.Item
        hasFeedback
        validateStatus={isValid}
        label="???????????? ??????"
        name="pw-confirm"
        style={{ height: '50px', width: '750px' }}
        extra={isValid === 'success' ? '??????' : ''}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value) {
                setIsValid('error');
                return Promise.reject('??????');
              }
              if (!value || getFieldValue('pw') === value) {
                setIsValid('success');
                return Promise.resolve();
              } else {
                setIsValid('error');
                return Promise.reject(new Error('??? ??????????????? ???????????? ??????'));
              }
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
};

const PW = () => {
  const [isValid, setIsValid] = useState('');
  return (
    <>
      <Form.Item
        hasFeedback
        validateStatus={isValid}
        label="????????????"
        name="pw"
        style={{ height: '50px', width: '750px' }}
        extra={isValid === 'success' ? '?????? ??????' : ''}
        rules={[
          ({ getFieldValue }) => ({
            async validator(_, value) {
              if (!value) {
                setIsValid('error');
                return Promise.reject('??????');
              }
              const teuksoo = /(?=.?[#?!@$%^&-])/g;
              const num = /(?=.?[0-9])/g;
              const eng = /(?=.?[A-Za-z])/g;
              const engOrNumOrTeuksoo = /^[A-Za-z0-9#?!@$%^&-]+$/g;
              const eightToFourty = /^.{8,40}$/g;
              let str = '';
              if (!value.match(eng)) str += '??????';
              if (!value.match(num)) str += ', ??????';
              if (!value.match(teuksoo)) str += ', ????????????';
              if (str) str += '??? ??? ?????? ?????? ??????';
              if (!value.match(eightToFourty)) str += ', 8?????? ~ 40??????';
              if (str[0] === ',') str = str.slice(1);
              if (!str && !value.match(engOrNumOrTeuksoo))
                str += '????????? ??? ?????? ????????? ?????????';
              if (str) {
                setIsValid('error');
                return Promise.reject(str);
              } else {
                setIsValid('success');
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
};

const Id = () => {
  const [isValid, setIsValid] = useState('');
  return (
    <>
      <Form.Item
        hasFeedback
        validateStatus={isValid}
        label="?????????"
        name="id"
        style={{ height: '50px', width: '750px' }}
        extra={isValid === 'success' ? '?????? ??????' : ''}
        rules={[
          ({ getFieldValue }) => ({
            async validator(_, value) {
              if (!value) {
                setIsValid('error');
                return Promise.reject('??????');
              }
              const startWithEnglish = /^[A-Za-z]/g;
              const engOrNum = /^[A-Za-z0-9]+$/g;
              const fourToTwenty = /^.{4,20}$/g;
              let str = '';
              if (!value.match(startWithEnglish)) str += '???????????? ??????';
              if (!value.match(engOrNum)) str += ', ?????? ?????? ???????????? ??????';
              if (!value.match(fourToTwenty)) str += ', 4?????? ~ 20??????';
              if (str[0] === ',') str = str.slice(1);
              if (str) {
                setIsValid('error');
                return Promise.reject(str);
              }

              let resp = await axios.get(`/user/is_id_exist?id=${value}`);
              if (resp.data.isExist === true) {
                setIsValid('error');
                return Promise.reject('?????? ???????????? ?????????');
              } else if (resp.data.isExist === false) {
                setIsValid('success');
                return Promise.resolve();
              } else {
                setIsValid('error');
                return Promise.reject(resp.statusText);
              }
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

const Nickname = () => {
  const [isValid, setIsValid] = useState('');
  return (
    <>
      <Form.Item
        hasFeedback
        validateStatus={isValid}
        label="?????????"
        name="nickname"
        style={{ height: '50px', width: '750px' }}
        extra={isValid === 'success' ? '?????? ??????' : ''}
        rules={[
          ({ getFieldValue }) => ({
            async validator(_, value) {
              // setIsValid('validating');
              if (!value) {
                setIsValid('error');
                return Promise.reject('??????');
              }
              const engOrNumOrTeuksoo = /^[A-Za-z0-9???-??????-??????-???]+$/g;
              const eightToFourty = /^.{2,20}$/g;
              let str = '';
              if (!value.match(eightToFourty)) str += '2?????? ~ 40??????';
              if (str[0] === ',') str = str.slice(1);
              if (!str && !value.match(engOrNumOrTeuksoo))
                str += '????????? ??? ?????? ????????? ?????????';
              if (str) {
                setIsValid('error');
                return Promise.reject(str);
              }

              let resp = await axios.get(
                `/user/is_nickname_exist?nickname=${value}`
              );
              if (resp.data.isExist === true) {
                setIsValid('error');
                return Promise.reject('?????? ???????????? ?????????');
              } else if (resp.data.isExist === false) {
                setIsValid('success');
                return Promise.resolve();
              } else {
                setIsValid('error');
                throw new Error(resp.statusText);
              }
            },
          }),
        ]}
      >
        <Input placeholder="???????????? ????????? ?????? ??????" />
      </Form.Item>
    </>
  );
};
