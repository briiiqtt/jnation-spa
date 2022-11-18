import { combineReducers } from 'redux';

import user from './userReducer';
import board from './boardReducer';
import menu from './menuReducer';
import etc from './etcReducer';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  user,
  board,
  menu,
  etc,
});

export default rootReducer;
