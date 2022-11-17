import { all, fork } from 'redux-saga/effects';

import axios from 'axios';

import userSaga from './userSaga';
import menuSaga from './menuSaga';

axios.defaults.baseURL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(menuSaga)]);
}
