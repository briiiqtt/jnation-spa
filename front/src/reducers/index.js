import { combineReducers } from 'redux';

import user from './userReducer';
import board from './boardReducer';
import menu from './menuReducer';

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
});

export default rootReducer;
