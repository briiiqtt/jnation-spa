import { Collapse } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const SidebarContent = () => {
  const menus = useSelector((state) => state.menu.menus);
  const boardUID = useSelector((state) => state.board.uid);

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
                    className={
                      content.uid === boardUID
                        ? 'menu-inner-active'
                        : 'menu-inner'
                    }
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
