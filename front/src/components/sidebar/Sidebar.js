import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SidebarTitle from './SidebarTitle';
import SidebarContent from './SidebarContent';
import { action_getMenu } from '../../reducers/menuReducer';
import { ScrollContainer } from '../common';

const Sidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action_getMenu());
  }, []);

  return (
    <>
      <ScrollContainer>
        <div
          style={{
            backgroundColor: '#FAFAFA',
            // position: 'fixed',
            // top: '1',
            // left: '1',
            // right: '1',
            // zIndex: '1',
            width: '268px',
            height: `calc(100vh - 58px)`,
            // overflowY: 'scroll',
            // msOverflowStyle: 'none',
          }}
          className="sidebar"
        >
          <SidebarTitle />
          <SidebarContent />
        </div>
      </ScrollContainer>
    </>
  );
};

export default Sidebar;
