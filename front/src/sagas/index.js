import userSaga from './users';
import { all, fork } from 'redux-saga/effects';

import _axios from 'axios';

export const axios = _axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'localhost:50080'
      : process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT,
});

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
