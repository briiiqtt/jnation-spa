export const GET_POSTS_REQ = 'GET_POSTS_REQ';
export const GET_POSTS_SUC = 'GET_POSTS_SUC';
export const GET_POSTS_ERR = 'GET_POSTS_ERR';

export const action_getPosts = (boardUID) => ({
  type: GET_POSTS_REQ,
  data: { boardUID },
});

const initialState = {
  boardUID: '',
  boardName: '',
  post: {
    posts: [],
    count: 0,
  },
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQ: {
      return {
        ...state,
        post: {
          ...state.post,
        },
        isLoading: true,
      };
    }
    case GET_POSTS_SUC: {
      return {
        ...state,
        post: {
          ...state.post,
          posts: action.data.posts,
          count: action.data.count,
        },
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
