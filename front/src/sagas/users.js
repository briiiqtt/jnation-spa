import { all, fork } from '@redux-saga/core/effects';

import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    yield delay(1000);
    yield put({
      type: 'LOG_IN_REQUEST',
      data: res.data,
    });
    // const res = yield call(loginAPI, action.data); // call() -> 두번째 인자부터(action.data) 첫번째 인자(함수, 여기선 loginAPI)의 인자로 들어간다
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: res.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.response.data,
    });
  }
}
function* logout(action) {
  try {
    yield put({
      type: 'LOG_OUT_REQUEST',
      data: res.data,
    });
    const res = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: res.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  // take() -> action{ type: '', data: {} ... } 액션 객체가
  // 두번째 인자인 함수* login(action)으로 전달된다
  yield throttle('LOG_IN_REQUEST', login, 10000);
}
function* watchLogout() {
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
  // yield all([fork(watchLogin), fork(watchLogout)]);
}
