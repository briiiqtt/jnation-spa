import { all, fork, delay, call } from 'redux-saga/effects';

import axios from 'axios';

import userSaga from './userSaga';
import menuSaga from './menuSaga';
import boardSaga from './boardSaga';
import etcSaga from './etcSaga';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:50080'
    : `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(menuSaga), fork(boardSaga), fork(etcSaga)]);
}
