import { all, fork } from 'redux-saga/effects';

import axios from 'axios';

import userSaga from './userSaga';
import menuSaga from './menuSaga';

// export const axios = _axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'development'
//       ? 'localhost:50080'
//       : process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT,
// });
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:50080'
    : `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`;
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(menuSaga)]);
}
