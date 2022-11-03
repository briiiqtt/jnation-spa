import { Pagination } from 'antd';
import React from 'react';

const Pagin = ({ postCnt }) => {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <Pagination
          total={postCnt}
          showSizeChanger={false}
          showQuickJumper={false}
          pageSize={15}
        />
      </div>
    </>
  );
};

export default Pagin;
