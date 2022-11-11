import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SidebarTitle from './SidebarTitle';
import SidebarContent from './SidebarContent';
import { action_getMenu } from '../../reducers/menuReducer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.menus);
  useEffect(() => {
    dispatch(action_getMenu());
    console.log(menus);
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          // position: 'fixed',
          // top: '1',
          // left: '1',
          // right: '1',
          // zIndex: '1',
          width: '268px',
          height: `calc(100vh - 58px)`,
          overflowY: 'scroll',
          // msOverflowStyle: 'none',
        }}
        className="sidebar"
      >
        <SidebarTitle />
        <SidebarContent menus={menus} />
      </div>
    </>
  );
};

export default Sidebar;
