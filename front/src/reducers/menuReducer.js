export const GET_MENU_REQ = 'GET_MENU_REQ';
export const GET_MENU_SUC = 'GET_MENU_SUC';
export const GET_MENU_ERR = 'GET_MENU_ERR';
export const ADD_MENU_GROUP_REQ = 'ADD_MENU_GROUP_REQ';
export const ADD_MENU_GROUP_SUC = 'ADD_MENU_GROUP_SUC';
export const ADD_MENU_GROUP_ERR = 'ADD_MENU_GROUP_ERR';
export const ADD_MENU_CONTENT_REQ = 'ADD_MENU_CONTENT_REQ';
export const ADD_MENU_CONTENT_SUC = 'ADD_MENU_CONTENT_SUC';
export const ADD_MENU_CONTENT_ERR = 'ADD_MENU_CONTENT_ERR';

export const action_getMenu = () => ({
  type: GET_MENU_REQ,
});
export const action_addMenuGroup = (menuGroup) => ({
  type: ADD_MENU_GROUP_REQ,
  data: menuGroup,
});
export const action_addMenuContent = (menu) => ({
  type: ADD_MENU_CONTENT_REQ,
  data: menu,
});

const initialState = {
  menus: [],
  isLoadingMenu: false,
  isAddingMenuGroup: false,
  isAddingMenu: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_REQ: {
      return {
        ...state,
        isLoadingMenu: true,
      };
    }
    case GET_MENU_SUC: {
      return {
        ...state,
        menus: action.data,
        isLoadingMenu: false,
      };
    }
    case GET_MENU_ERR: {
      return {
        ...state,
        isLoadingMenu: false,
      };
    }
    case ADD_MENU_GROUP_REQ: {
      return {
        ...state,
        isAddingMenuGroup: true,
      };
    }
    case ADD_MENU_GROUP_SUC: {
      return {
        ...state,
        isAddingMenuGroup: false,
      };
    }
    case ADD_MENU_GROUP_ERR: {
      return {
        ...state,
        isAddingMenuGroup: false,
      };
    }
    case ADD_MENU_CONTENT_REQ: {
      return {
        ...state,
        isAddingMenu: true,
      };
    }
    case ADD_MENU_CONTENT_SUC: {
      return {
        ...state,
        isAddingMenu: false,
      };
    }
    case ADD_MENU_CONTENT_ERR: {
      return {
        ...state,
        isAddingMenu: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
