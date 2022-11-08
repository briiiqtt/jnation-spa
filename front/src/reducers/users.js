export const LOG_IN_REQ = 'LOG_IN_REQ`';
export const LOG_IN_SUC = 'LOG_IN_SUC`';
export const LOG_IN_ERR = 'LOG_IN_ERR`';
export const LOG_OUT_REQ = 'LOG_OUT_REQ';
export const LOG_OUT_SUC = 'LOG_OUT_SUC';
export const LOG_OUT_ERR = 'LOG_OUT_ERR';

export const action_login = (user) => ({
  type: LOG_IN_REQ,
  data: user,
});
export const action_logout = () => ({
  type: LOG_OUT_REQ,
});

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQ: {
      return {
        ...state,
        isLoggingIn: true,
        user: action.data,
      };
    }
    case LOG_IN_SUC: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        user: action.data,
      };
    }
    case LOG_IN_ERR: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        user: action.data,
      };
    }
    case LOG_OUT_REQ: {
      return {
        ...state,
        isLoggingOut: true,
      };
    }
    case LOG_OUT_SUC: {
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        user: null,
      };
    }
    case LOG_OUT_ERR: {
      return {
        ...state,
        isLoggingOut: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;