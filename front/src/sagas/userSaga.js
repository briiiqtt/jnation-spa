import { call, all, fork, put, takeLatest } from '@redux-saga/core/effects';
import {
  JOIN_ERR,
  JOIN_REQ,
  JOIN_SUC,
  LOG_IN_ERR,
  LOG_IN_REQ,
  LOG_IN_SUC,
  LOG_OUT_ERR,
  LOG_OUT_REQ,
  LOG_OUT_SUC,
} from '../reducers/userReducer';

import axios from 'axios';

function loginAPI(data) {
  return axios.post('user/login', data);
}
function joinAPI(data) {
  return axios.post('/user/add', data);
}

function* login(action) {
  try {
    const res = yield call(loginAPI, action.data); // call() -> 두번째 인자부터(action.data) 첫번째 인자(함수, 여기선 loginAPI)의 인자로 들어간다
    yield put({
      type: LOG_IN_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_ERR,
      data: error.response.data,
    });
  }
}
function* logout(action) {
  try {
    yield put({
      type: LOG_OUT_SUC,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_ERR,
    });
  }
}
function* join(action) {
  try {
    const res = yield call(joinAPI, action.data);
    yield put({
      type: JOIN_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: JOIN_ERR,
      data: error.response.data,
    });
  }
}

// function* watchLogin() {
//   // take() -> action{ type: '', data: {} ... } 액션 객체가
//   // 두번째 인자인 함수* login(action)으로 전달된다
//   yield throttle(LOG_IN_REQ, login, 10000);
// }
function* watchLogin() {
  yield takeLatest(LOG_IN_REQ, login);
}
function* watchLogout() {
  yield takeLatest(LOG_OUT_REQ, logout);
}
function* watchJoin() {
  yield takeLatest(JOIN_REQ, join);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchJoin)]);
}
