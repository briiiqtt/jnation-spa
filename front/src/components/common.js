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
export const graySpin = (size = 14, margin = 5) => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{ color: 'gray', fontSize: size, margin: `${margin}px` }}
        spin
      />
    }
  />
);

export const getDefaultTimeStamp = (date) => {
  const createdAt = new Date(date);
  if (createdAt == 'Invalid Date') return graySpin();
  return `${createdAt.getFullYear()}. ${
    createdAt.getMonth() + 1
  }. ${createdAt.getDate()}`;
};

export const getTimeStamp = (date) => {
  const createdAt = new Date(date);
  if (now - 1000 * 60 * 60 * 24 < createdAt) {
    const secs = (now - createdAt) / 1000;
    const mins = secs / 60;
    const hours = mins / 24;
    return secs <= 60
      ? `${Math.floor(secs)}초 전`
      : mins <= 60
      ? `${Math.floor(mins)}분 전`
      : `${Math.floor(hours)}시간 전`;
  } else {
    return `${createdAt.getFullYear()}. ${
      createdAt.getMonth() + 1
    }. ${createdAt.getDate()}`;
  }
};
