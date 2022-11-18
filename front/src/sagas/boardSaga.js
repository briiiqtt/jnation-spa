import { call, all, fork, put, takeLatest } from '@redux-saga/core/effects';
import {
  GET_POSTS_ERR,
  GET_POSTS_REQ,
  GET_POSTS_SUC,
} from '../reducers/boardReducer';

import axios from 'axios';

function getPostAPI(data) {
  return axios.get('/board/get-paged-board', { params: data });
}

function* getPosts(action) {
  try {
    const res = yield call(getPostAPI, action.data);
    yield put({
      type: GET_POSTS_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_POSTS_ERR,
      data: error.response.data,
    });
  }
}

function* watchGetPosts() {
  yield takeLatest(GET_POSTS_REQ, getPosts);
}

export default function* boardSaga() {
  yield all([fork(watchGetPosts)]);
}
