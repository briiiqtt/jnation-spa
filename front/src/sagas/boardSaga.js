import { call, all, fork, put, takeLatest } from '@redux-saga/core/effects';
import {
  GET_POSTS_ERR,
  GET_POSTS_REQ,
  GET_POSTS_SUC,
  ADD_POST_REQ,
  ADD_POST_SUC,
  ADD_POST_ERR,
} from '../reducers/boardReducer';

import axios from 'axios';

function getPostAPI(data) {
  const { boardUID, page } = data;
  return axios.get(`/board/${boardUID}/${page}`, { params: data });
}
function addPostAPI(data) {
  return axios.post('/board/post/add', data);
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
function* addPost(action) {
  try {
    const res = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_ERR,
      data: error.response.data,
    });
  }
}

function* watchGetPosts() {
  yield takeLatest(GET_POSTS_REQ, getPosts);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQ, addPost);
}

export default function* boardSaga() {
  yield all([fork(watchGetPosts), fork(watchAddPost)]);
}
