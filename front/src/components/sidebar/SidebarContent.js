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
          defaultActiveKey={menus.map((group) => group.uid)}
          bordered={false}
          className="menu-content"
          expandIconPosition="end"
        >
          {menus.map((group) => (
            <Panel header={group.name} key={group.uid} className="menu-panel">
              {group.content.map((inner, i) => (
                <Link
                  to={`/board/${inner.boardId}`}
                  key={i}
                  style={{ color: 'black' }}
                >
                  <p
                    key={i}
                    className="menu-inner"
                    style={{ cursor: 'pointer' }}
                  >
                    {inner.name}
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
