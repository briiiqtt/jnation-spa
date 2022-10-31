export const SET_BOARD_ID = 'SET_BOARD_ID';

export const action_setBoardId = (boardId) => ({
  type: SET_BOARD_ID,
  data: boardId,
});

const initialState = {
  title: '',
  user: {},
  board: {
    boardId: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_ID: {
      return {
        ...state,
        board: { ...state.board, boardId: action.data },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
