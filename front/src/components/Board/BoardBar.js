import { EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import React, { useCallback } from 'react';

const BoardBar = ({ boardName, postCnt }) => {
  const fontSize = useCallback((fs) => ({ fontSize: fs + 'px' }));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <HomeOutlined style={{ ...fontSize(18), top: '30px' }} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={fontSize(18)}>{boardName}</span>
              <span
                style={{ ...fontSize(15), color: 'gray' }}
              >{` (${postCnt})`}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <Button style={{ border: '1px solid gray' }}>
            <EditOutlined style={{ fontSize: '18px', padding: '0px' }} />
            글쓰기
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default BoardBar;
