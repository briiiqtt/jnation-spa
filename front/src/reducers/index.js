export const SET_BOARD_ID = 'SET_BOARD_ID';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const action_setBoardId = (boardId) => ({
  type: SET_BOARD_ID,
  data: boardId,
});
export const action_login = (user) => ({
  type: LOGIN,
  data: user,
});
export const action_logout = () => ({
  type: LOGOUT,
});

const initialState = {
  title: '',
  session: {
    isLoggedIn: false,
    user: null,
  },
  board: {
    boardId: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_ID: {
      return {
        ...state,
        board: {
          ...state.board,
          boardId: action.data,
        },
      };
    }
    case LOGIN: {
      return {
        ...state,
        session: {
          ...state.session,
          isLoggedIn: true,
          user: action.data,
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        session: {
          ...state.session,
          isLoggedIn: false,
          user: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
