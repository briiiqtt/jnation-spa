import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const spin = (
  <Spin
    indicator={
      <LoadingOutlined style={{ fontSize: 24, margin: '0px 10px' }} spin />
    }
  />
);
export const graySpin = (
  <Spin
    indicator={
      <LoadingOutlined
        style={{ color: 'gray', fontSize: 24, margin: '0px 10px' }}
        spin
      />
    }
  />
);
