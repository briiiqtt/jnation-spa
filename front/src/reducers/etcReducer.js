export const SET_TEMP_POST = 'SET_TEMP_POST';

export const action_setTempPost = (data) => ({
  type: SET_TEMP_POST,
  data,
});

const initialState = {
  tempPost: {
    boardUID: '',
    title: '',
    content: '',
  },
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
      if (action.data.title) _state.tempPost.title = action.data.title;
      if (action.data.content) _state.tempPost.content = action.data.content;
      if (action.data.boardUID) _state.tempPost.boardUID = action.data.boardUID;
      return _state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
