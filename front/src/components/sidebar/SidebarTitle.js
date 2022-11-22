import React, { useEffect } from 'react';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { action_getUserTotal } from '../../reducers/etcReducer';

const SidebarTitle = () => {
  const dispatch = useDispatch();
  const userTotal = useSelector((state) => state.etc.userTotal);
  useEffect(() => {
    dispatch(action_getUserTotal());
  }, []);
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
        <span style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>
          제2의 나라: Cross Worlds
        </span>
        <div>
          <div>
            <CrownOutlined style={{ margin: '5px' }} />
            공식 포럼
          </div>
          <div>
            <UserOutlined style={{ margin: '5px' }} />
            <span>{userTotal}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarTitle;
