import { Collapse } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import {
  ArrowReturnRight,
  Folder,
  FolderFill,
  Link45deg,
} from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;

const SidebarContent = () => {
  const menus = useSelector((state) => state.menu.menus);
  const boardUID = useSelector((state) => state.board.uid);
  const navigate = useNavigate();

  const onMenuContentClick = (content) => {
    if (content.type === 'board') navigate(`/board/${content.uid}`);
    else if (content.type === 'external_link') window.open(content.ref);
  };

  return (
    <>
      <div style={{ padding: '10px 16px' }}>
        <div
          style={{ padding: '10px', cursor: 'pointer' }}
          className="ant-collapse-header"
        >
          <b>전체 글</b>
        </div>
        <Collapse
          activeKey={menus.map((menu) => menu.uid)}
          bordered={false}
          className="menu-content"
          expandIconPosition="end"
        >
          {menus.map((group) => (
            <Panel
              header={
                <span
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <FolderFill
                    fontSize={18}
                    style={{ margin: '2px 8px 0px 0px', color: '#b8b8b8' }}
                  />
                  {group.name}
                </span>
              }
              key={group.uid}
              className="menu-panel"
            >
              {group.contents.map((content, i) => (
                <p
                  key={i}
                  onClick={() => onMenuContentClick(content)}
                  className={
                    content.uid === boardUID
                      ? 'menu-inner-active'
                      : 'menu-inner'
                  }
                  style={{
                    cursor: 'pointer',
                    // display: 'flex',
                    // justifyContent: 'space-between',
                  }}
                >
                  {content.type === 'external_link' && (
                    <span>
                      <Link45deg
                        fontSize={18}
                        style={{ margin: '8px 10px 0px 0px', color: '#808080' }}
                      />
                    </span>
                  )}
                  {content.type === 'board' && (
                    <span>
                      <ArrowReturnRight
                        fontSize={18}
                        style={{ margin: '8px 10px 0px 0px', color: '#b8b8b8' }}
                      />
                    </span>
                  )}
                  <span>{content.name}</span>
                </p>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
};

export default SidebarContent;
