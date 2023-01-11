export const LOG_IN_REQ = 'LOG_IN_REQ';
export const LOG_IN_SUC = 'LOG_IN_SUC';
export const LOG_IN_ERR = 'LOG_IN_ERR';
export const LOG_OUT_REQ = 'LOG_OUT_REQ';
export const LOG_OUT_SUC = 'LOG_OUT_SUC';
export const LOG_OUT_ERR = 'LOG_OUT_ERR';
export const JOIN_REQ = 'JOIN_REQ';
export const JOIN_SUC = 'JOIN_SUC';
export const JOIN_ERR = 'JOIN_ERR';
export const GET_SESSION_REQ = 'GET_SESSION_REQ';
export const GET_SESSION_SUC = 'GET_SESSION_SUC';
export const GET_SESSION_ERR = 'GET_SESSION_ERR';

export const action_login = (data) => ({
  type: LOG_IN_REQ,
  data,
});
export const action_join = (data) => ({
  type: JOIN_REQ,
  data,
});
export const action_logout = () => ({
  type: LOG_OUT_REQ,
});
export const action_getSession = () => ({
  type: GET_SESSION_REQ,
});

const initialState = {
  me: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isJoining: false,
  isGettingSession: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQ: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case LOG_IN_SUC: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: action.data,
      };
    }
    case LOG_IN_ERR: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        me: action.data,
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
        me: null,
      };
    }
    case LOG_OUT_ERR: {
      return {
        ...state,
        isLoggingOut: false,
      };
    }
    case JOIN_REQ: {
      return {
        ...state,
        isJoining: true,
      };
    }
    case JOIN_SUC: {
      return {
        ...state,
        isJoining: false,
        me: { id: action.data.id, nickname: action.data.nickname },
      };
    }
    case JOIN_ERR: {
      return {
        ...state,
        isJoining: false,
      };
    }
    case GET_SESSION_REQ: {
      return {
        ...state,
        isGettingSession: true,
      };
    }
    case GET_SESSION_SUC: {
      console.log(action.data);
      return {
        ...state,
        isGettingSession: false,
        isLoggedIn: true,
        me: action.data,
      };
    }
    case GET_SESSION_ERR: {
      return {
        ...state,
        isGettingSession: false,
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
