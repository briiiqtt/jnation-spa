export const SET_TEMP_POST = 'SET_TEMP_POST';
export const GET_USER_TOTAL_REQ = 'GET_USER_TOTAL_REQ';
export const GET_USER_TOTAL_SUC = 'GET_USER_TOTAL_SUC';
export const GET_USER_TOTAL_ERR = 'GET_USER_TOTAL_ERR';

export const action_setTempPost = (data) => ({
  type: SET_TEMP_POST,
  data,
});
export const action_getUserTotal = () => ({
  type: GET_USER_TOTAL_REQ,
});

const initialState = {
  tempPost: {
    boardUID: null,
    title: null,
    content: null,
  },
  userTotal: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_POST: {
      const _state = {
        ...state,
        tempPost: {
          ...state.tempPost,
        },
      };
      if (action.data.title !== undefined)
        _state.tempPost.title = action.data.title;
      if (action.data.content !== undefined)
        _state.tempPost.content = action.data.content;
      if (action.data.boardUID !== undefined)
        _state.tempPost.boardUID = action.data.boardUID;
      return _state;
    }
    case GET_USER_TOTAL_SUC: {
      return { ...state, userTotal: action.data.userTotal };
    }
    case GET_USER_TOTAL_ERR: {
      return { ...state, userTotal: null };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
