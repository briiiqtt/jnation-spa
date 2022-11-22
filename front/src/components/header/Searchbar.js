import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Row } from 'antd';
const { Search } = Input;

const Searchbar = () => {
  return (
    <>
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '460px',
        }}
      >
        <Search
          placeholder="검색"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          //   onSearch={onSearch}
          style={{ backgroundColor: '#827d7d' }}
        />
      </span>
      <span style={{ width: '112px' }}></span>
    </>
  );
};

export default Searchbar;
