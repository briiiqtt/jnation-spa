export const SET_BOARD = 'SET_BOARD';
export const SET_POSTS_REQ = 'SET_POSTS_REQ';
export const GET_POSTS_REQ = 'GET_POSTS_REQ';
export const GET_POSTS_SUC = 'GET_POSTS_SUC';
export const GET_POSTS_ERR = 'GET_POSTS_ERR';

export const action_setBoard = (data) => {
  return {
    type: SET_BOARD,
    data,
  };
};

export const action_getPosts = (data) => ({
  type: GET_POSTS_REQ,
  data,
});
export const action_setPosts = (data) => ({
  type: SET_POSTS_REQ,
  data,
});

const initialState = {
  uid: '',
  name: '',
  page: 1,
  pageSize: 10,
  post: {
    posts: [],
    total: 0,
  },
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS_REQ: {
      return {
        ...state,
        post: {
          ...state.post,
          posts: action.data.posts,
          total: action.data.total,
        },
      };
    }
    case GET_POSTS_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_POSTS_SUC: {
      console.log(action.data);
      return {
        ...state,
        uid: action.data.boardUID,
        name: action.data.boardName,
        page: action.data.page,
        post: {
          ...state.post,
          posts: action.data.posts,
          total: action.data.total,
        },
        isLoading: false,
      };
    }
    case GET_POSTS_ERR: {
      return {
        ...state,
        page: action.data.page,
        post: {
          ...state.post,
          posts: [],
          total: 0,
        },
        isLoading: false,
      };
    }
    case SET_BOARD: {
      const _state = { ...state };
      if (action.data.boardUID) _state.uid = action.data.boardUID;
      if (action.data.boardName) _state.name = action.data.boardName;
      return _state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
