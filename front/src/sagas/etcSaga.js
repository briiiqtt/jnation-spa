import { call, all, fork, put, takeLatest } from '@redux-saga/core/effects';

import axios from 'axios';
import {
  GET_USER_TOTAL_ERR,
  GET_USER_TOTAL_REQ,
  GET_USER_TOTAL_SUC,
} from '../reducers/etcReducer';

function getUserTotalAPI() {
  return axios.get('user/total');
}

function* getUserTotal() {
  try {
    const res = yield call(getUserTotalAPI);
    yield put({
      type: GET_USER_TOTAL_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_USER_TOTAL_ERR,
      data: error.response.data,
    });
  }
}
function* watchGetUserTotal() {
  yield takeLatest(GET_USER_TOTAL_REQ, getUserTotal);
}

export default function* etcSaga() {
  yield all([fork(watchGetUserTotal)]);
}
