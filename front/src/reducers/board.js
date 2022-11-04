export const SET_BOARD_ID_REQ = 'SET_BOARD_ID_REQ';
export const SET_BOARD_ID_SUC = 'SET_BOARD_ID_SUC';
export const SET_BOARD_ID_ERR = 'SET_BOARD_ID_ERR';
export const GET_POSTS_REQ = 'GET_POSTS_REQ';
export const GET_POSTS_SUC = 'GET_POSTS_SUC';
export const GET_POSTS_ERR = 'GET_POSTS_ERR';

export const action_setBoardId = (boardId) => ({
  type: SET_BOARD_ID_REQ,
  data: boardId,
});
export const action_getPosts = () => ({
  type: GET_POSTS_REQ,
});

const dummyPosts = new Array(11).fill().map((val, idx) => ({
  key: idx,
  id: 'id' + idx,
  title: '제목' + idx,
  author: '작성자' + idx,
  content: '본문' + idx,
  viewCnt: 125,
  comments: [1, 2, 3],
  imgs: [1],
  createdAt: 'YYYY-MM-DD hh:mm:ss',
}));

const initialState = {
  boardId: '',
  boardName: '',
  post: {
    posts: [],
    cnt: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_ID_REQ: {
      return {
        ...state,
        boardId: action.data,
      };
    }
    case GET_POSTS_REQ: {
      return {
        ...state,
        post: {
          ...state.board.post,
          posts: dummyPosts,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
