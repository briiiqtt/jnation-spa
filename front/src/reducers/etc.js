const dummyMenu = [
  {
    key: 0,
    name: '새 소식',
    innerMenu: [
      { name: '공지사항', boardId: 'Xi21', type: 'board' },
      { name: '업데이트', boardId: 'vNCi3', type: 'board' },
      { name: '이슈확인 / 조치사항', boardId: 'NCKL2i', type: 'board' },
      { name: '개발자노트', boardId: 'MCO8', type: 'board' },
      { name: 'GM노트', boardId: '_cj9D', type: 'board' },
    ],
  },
  {
    key: 1,
    name: '추천 가이드',
    innerMenu: [
      { name: '게임 가이드', boardId: 'MCi23', type: 'board' },
      { name: '공략 & TIP', boardId: 'V0vk2', type: 'board' },
    ],
  },
  {
    key: 2,
    name: '제2의 나라 공식 방송',
    innerMenu: [
      { name: '공식방송 <제2TV쇼> 안내', boardId: 'JI2d', type: 'board' },
      { name: '방송 참여 이벤트 안내', boardId: 'JI2d', type: 'board' },
      { name: '<제2TV쇼> 다시보기', boardId: 'JI2d', type: 'board' },
    ],
  },
  {
    key: 3,
    name: '이벤트',
    innerMenu: [
      { name: '이벤트 안내', boardId: 'JI2d', type: 'board' },
      { name: '이벤트 당첨자 안내', boardId: 'JI2d', type: 'board' },
    ],
  },
  {
    key: 4,
    name: '커뮤니티',
    innerMenu: [
      { name: '자유게시판', boardId: 'free', type: 'board' },
      { name: '질문 & 답변', boardId: 'qna', type: 'board' },
      { name: '친구 찾기 & 킹덤 홍보', boardId: 'hall', type: 'board' },
      { name: '스크린샷 & 팬아트', boardId: 'arts', type: 'board' },
    ],
  },
];

export const GET_MENU_REQ = 'GET_MENU_REQ';
export const GET_MENU_SUC = 'GET_MENU_SUC';
export const GET_MENU_ERR = 'GET_MENU_ERR';

const initialState = {
  title: '제2의나라',
  menu: dummyMenu,
};

export const action_getMenu = () => ({
  type: GET_MENU_REQ,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_REQ: {
      return {
        ...state,
        menu: dummyMenus,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
