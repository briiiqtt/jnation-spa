import { Collapse } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { action_getMenu } from '../../reducers/menuReducer';

const { Panel } = Collapse;

const SidebarContent = ({ menus }) => {
  return (
    <>
      <div style={{ padding: '20px' }}>
        <div
          style={{ padding: '10px', cursor: 'pointer' }}
          className="ant-collapse-header"
        >
          전체 글
        </div>
        <Collapse
          activeKey={menus.map((menu) => menu.uid)}
          bordered={false}
          className="menu-content"
          expandIconPosition="end"
        >
          {menus.map((group) => (
            <Panel header={group.name} key={group.uid} className="menu-panel">
              {group.contents.map((content, i) => (
                <Link
                  to={`${
                    content.type === 'board' ? `/board/${content.uid}` : ''
                  }`}
                  key={i}
                  style={{ color: 'black' }}
                >
                  <p
                    key={i}
                    className="menu-inner"
                    style={{ cursor: 'pointer' }}
                  >
                    {content.name}
                  </p>
                </Link>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
};

export default SidebarContent;
