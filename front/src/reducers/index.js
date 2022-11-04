import { combineReducers } from 'redux';

import user from './users';
import etc from './etc';
import board from './board';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  etc,
  user,
  board,
});

export default rootReducer;
