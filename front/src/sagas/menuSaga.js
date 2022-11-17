import { call, all, fork, put, takeLatest } from '@redux-saga/core/effects';
import {
  GET_MENU_REQ,
  GET_MENU_SUC,
  GET_MENU_ERR,
  ADD_MENU_GROUP_REQ,
  ADD_MENU_GROUP_SUC,
  ADD_MENU_GROUP_ERR,
  ADD_MENU_CONTENT_REQ,
  ADD_MENU_CONTENT_SUC,
  ADD_MENU_CONTENT_ERR,
} from '../reducers/menuReducer';

import axios from 'axios';

function getMenuAPI() {
  return axios.get('/menu/get');
}
function addMenuGroupAPI(data) {
  return axios.post('menu/group/add', data);
}
function addMenuContentAPI(data) {
  return axios.post('menu/content/add', data);
}

function* getMenu() {
  try {
    const res = yield call(getMenuAPI);
    yield put({
      type: GET_MENU_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_MENU_ERR,
      data: error.response.data,
    });
  }
}
function* addMenuGroup(action) {
  console.log(action);
  try {
    const res = yield call(addMenuGroupAPI, action.data);
    yield put({
      type: ADD_MENU_GROUP_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_MENU_GROUP_ERR,
      data: error.response.data,
    });
  }
}
function* addMenuContent(action) {
  try {
    const res = yield call(addMenuContentAPI, action.data);
    yield put({
      type: ADD_MENU_CONTENT_SUC,
      data: res.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_MENU_CONTENT_ERR,
      data: error.response.data,
    });
  }
}
function* watchGetMenu() {
  yield takeLatest(GET_MENU_REQ, getMenu);
}
function* watchAddMenuGroup() {
  yield takeLatest(ADD_MENU_GROUP_REQ, addMenuGroup);
}
function* watchAddMenuContent() {
  yield takeLatest(ADD_MENU_CONTENT_REQ, addMenuContent);
}

export default function* menuSaga() {
  yield all([
    fork(watchGetMenu),
    fork(watchAddMenuContent),
    fork(watchAddMenuGroup),
  ]);
}
