export const SET_ADDED_POST_UID = 'SET_ADDED_POST_UID';
export const SET_BOARD = 'SET_BOARD';
export const SET_POSTS_REQ = 'SET_POSTS_REQ';
export const GET_POSTS_REQ = 'GET_POSTS_REQ';
export const GET_POSTS_SUC = 'GET_POSTS_SUC';
export const GET_POSTS_ERR = 'GET_POSTS_ERR';
export const ADD_POST_REQ = 'ADD_POST_REQ';
export const ADD_POST_SUC = 'ADD_POST_SUC';
export const ADD_POST_ERR = 'ADD_POST_ERR';

export const action_setAddedPostUID = (data) => {
  return {
    type: SET_ADDED_POST_UID,
    data,
  };
};
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
export const action_addPost = (data) => ({
  type: ADD_POST_REQ,
  data,
});

const initialState = {
  uid: '',
  name: '',
  page: 1,
  post: {
    posts: [],
    total: 0,
  },
  isLoading: false,
  isAddingPost: false,
  addedPostUID: null,
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
    case ADD_POST_REQ: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case ADD_POST_SUC: {
      return {
        ...state,
        isAddingPost: false,
        addedPostUID: action.data.uid,
      };
    }
    case ADD_POST_ERR: {
      return {
        ...state,
        isAddingPost: false,
      };
    }
    case SET_ADDED_POST_UID: {
      return {
        ...state,
        addedPostUID: action.data.addedPostUID,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
