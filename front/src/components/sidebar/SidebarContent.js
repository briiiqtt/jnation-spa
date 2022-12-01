import { Collapse } from 'antd';
import React, { useCallback } from 'react';
import { ArrowReturnRight, FolderFill, Link45deg } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from '../common';

const { Panel } = Collapse;

const SidebarContent = () => {
  const menus = useSelector((state) => state.menu.menus);
  const boardUID = useSelector((state) => state.board.uid);

  const getPath = useCallback((content) => {
    return content.type === 'board'
      ? `/board/${content.uid}`
      : content.type === 'external_link'
      ? content.ref
      : null;
  });

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
                <Link
                  key={i}
                  href={getPath(content)}
                  reload={content.type !== 'board'}
                >
                  <span
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
                          style={{
                            margin: '8px 10px 0px 0px',
                            color: '#808080',
                          }}
                        />
                      </span>
                    )}
                    {content.type === 'board' && (
                      <span>
                        <ArrowReturnRight
                          fontSize={18}
                          style={{
                            margin: '8px 10px 0px 0px',
                            color: '#b8b8b8',
                          }}
                        />
                      </span>
                    )}
                    <span style={{ color: '#3e4249' }}>{content.name}</span>
                  </span>
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
