import { Collapse } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const SidebarContent = ({ menus }) => {
  const dispatch = useDispatch();

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
          defaultActiveKey={menus.map((category) => category.key)}
          bordered={false}
          //  onChange={onChange}
          className="menu-category"
          expandIconPosition="end"
        >
          {menus.map((category) => (
            <Panel
              header={category.name}
              key={category.key}
              className="menu-panel"
            >
              {category.innerMenu.map((inner, i) => (
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
