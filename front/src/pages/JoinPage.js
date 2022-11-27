import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { action_join } from '../reducers/userReducer';
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

  const main = () => {
    navigate('/');
  };

  return (
    <>
      <div style={headerStyle}>
        <span onClick={main} style={{ cursor: 'pointer' }}>
          <img src="https://sgimage.netmarble.com/images/netmarble/enn/20210407/tpew1617761984326.png"></img>
        </span>
      </div>
    </>
  );
};

const JoinForm = () => {
  const dispatch = useDispatch();
  const onFinish = useCallback(async (data) => {
    console.log(data);
    dispatch(action_join(data));
  });
  const onFinishFailed = useCallback((data) => {
    console.log(data);
  });
  const isJoining = useSelector((state) => state.user.isJoining);
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
          <Form.Item
            label="아이디"
            name="id"
            style={{ height: '50px', width: '750px' }}
            rules={[
              {
                required: true,
                message: '사용할 아이디를 입력하세요.',
              },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (!value) return Promise.reject();
                  const startWithEnglish = /^[A-Za-z]/g;
                  const engOrNum = /^[A-Za-z0-9]+$/g;
                  const fourToTwenty = /^.{4,20}$/g;
                  let str = '';
                  if (!value.match(startWithEnglish)) str += '영문으로 시작';
                  if (!value.match(engOrNum))
                    str += ', 영문 또는 숫자로만 구성';
                  if (!value.match(fourToTwenty)) str += ', 4글자 ~ 20글자';
                  if (str[0] === ',') str = str.slice(1);
                  if (str) return Promise.reject(str);

                  let resp = await axios.get(
                    `/user/is_id_available?id=${value}`
                  );
                  if (resp.data.isAvailable) return Promise.resolve();
                  else return Promise.reject('이미 사용중인 아이디');
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="pw"
            style={{ height: '50px', width: '750px' }}
            rules={[
              {
                required: true,
                message: '사용할 비밀번호를 입력하세요.',
              },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (!value) return Promise.reject();
                  const teuksoo = /(?=.?[#?!@$%^&-])/g;
                  const num = /(?=.?[0-9])/g;
                  const eng = /(?=.?[A-Za-z])/g;
                  const engOrNumOrTeuksoo = /^[A-Za-z0-9#?!@$%^&-]+$/g;
                  const eightToFourty = /^.{8,40}$/g;
                  let str = '';
                  if (!value.match(eng)) str += '영어';
                  if (!value.match(num)) str += ', 숫자';
                  if (!value.match(teuksoo)) str += ', 특수문자';
                  if (str) str += '를 한 글자 이상 포함';
                  if (!value.match(eightToFourty)) str += ', 8글자 ~ 40글자';
                  if (str[0] === ',') str = str.slice(1);
                  if (!str && !value.match(engOrNumOrTeuksoo))
                    str += '사용할 수 없는 문자가 포함됨';
                  if (str) return Promise.reject(str);
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="비밀번호 확인"
            name="pw-confirm"
            style={{ height: '50px', width: '750px' }}
            rules={[
              {
                required: true,
                message: '동일한 비밀번호를 입력하세요.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pw') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('두 비밀번호가 일치하지 않음')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="닉네임"
            name="nickname"
            style={{ height: '50px', width: '750px' }}
            rules={[
              {
                required: true,
                message: '사용할 닉네임을 입력하세요.',
              },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (!value) return Promise.reject();
                  const engOrNumOrTeuksoo = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/g;
                  const eightToFourty = /^.{2,20}$/g;
                  let str = '';
                  if (!value.match(eightToFourty)) str += '2글자 ~ 40글자';
                  if (str[0] === ',') str = str.slice(1);
                  if (!str && !value.match(engOrNumOrTeuksoo))
                    str += '사용할 수 없는 문자가 포함됨';
                  if (str) return Promise.reject(str);

                  let resp = await axios.get(
                    `/user/is_nickname_available?nickname=${value}`
                  );
                  if (resp.data.isAvailable) return Promise.resolve();
                  else return Promise.reject('이미 사용중인 닉네임');
                },
              }),
            ]}
          >
            <Input placeholder="닉네임은 이후에 변경 가능" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 11,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isJoining}>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
