import { all, fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    yield put({
      type: 'LOG_IN_REQUEST',
      data: res.data,
    });
    const res = yield call(loginAPI);
    yield put({
      type: 'LOG_IN_SUCCESSS',
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
      type: 'LOG_OUT_SUCCESSS',
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
  yield take('LOG_IN_REQUEST', login);
}
function* watchLogout() {
  yield take('LOG_OUT_REQUEST', logout);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchLogout)]);
}
