import React from 'react';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

const SidebarTitle = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#2d2121',
          // transform: `translate(0px, 0px) translateZ(0px)`,
          color: 'white',
          padding: '20px',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          제 2의 나라: Cross Worlds
        </span>
        <div>
          <div>
            <CrownOutlined style={{ margin: '5px' }} />
            공식 포럼
          </div>
          <div>
            <UserOutlined style={{ margin: '5px' }} />
            299,460
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarTitle;
