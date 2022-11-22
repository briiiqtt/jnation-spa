import { call, all, fork, put, takeLatest } from '@redux-saga/core/effects';
import {
  GET_POSTS_ERR,
  GET_POSTS_REQ,
  GET_POSTS_SUC,
  ADD_POST_REQ,
  ADD_POST_SUC,
  ADD_POST_ERR,
  GET_POST_ERR,
  GET_POST_SUC,
  GET_POST_REQ,
} from '../reducers/boardReducer';

import axios from 'axios';

function getPostsAPI(data) {
  const { boardUID, page } = data;
  return axios.get(`/board/${boardUID}/${page}`);
}
function addPostAPI(data) {
  return axios.post('/board/post/add', data);
}
function getPostAPI(data) {
  const { postUID } = data;
  return axios.get(`/board/post/${postUID}`);
}

function* getPosts(action) {
  try {
    const res = yield call(getPostsAPI, action.data);
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
function* getPost(action) {
  try {
    const res = yield call(getPostAPI, action.data);
    yield put({
      type: GET_POST_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_POST_ERR,
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
function* watchGetPost() {
  yield takeLatest(GET_POST_REQ, getPost);
}

export default function* boardSaga() {
  yield all([fork(watchGetPosts), fork(watchAddPost), fork(watchGetPost)]);
}
