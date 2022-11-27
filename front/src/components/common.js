import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useLocation } from 'react-router-dom';

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

export const getTimeStampYYYYMMDD = (date) => {
  const createdAt = new Date(date);
  if (createdAt == 'Invalid Date') return graySpin();
  return `${createdAt.getFullYear()}. ${
    createdAt.getMonth() + 1
  }. ${createdAt.getDate()}`;
};

export const getTimeStampYYYYMMDDhh24mm = (date) => {
  const d = new Date(date);
  if (d == 'Invalid Date') return graySpin();
  return `${d.getFullYear()}. ${
    d.getMonth() + 1
  }. ${d.getDate()}. ${d.getHours()}:${d.getMinutes()}`;
};

export const getTimeStamp = (date, now) => {
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

export const TextLoading = () => {
  const [flag, setFlag] = useState(0);
  const sleep = useCallback((ms) => {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  });
  useEffect(() => {
    sleep(100);
    setFlag(flag + 1);
  }, [flag]);
  return <>{flag % 3 === 0 ? '∙' : flag % 3 === 1 ? '∙ ∙' : '∙ ∙ ∙'}</>;
};

export const ScrollContainer = ({ children }) => {
  const location = useLocation();
  const ps = useRef();
  useEffect(() => {
    const isBoard = location.pathname.slice(0, 6) === '/board';
    console.log(ps.current.scrollTop);
    if (isBoard) {
      ps.current.scrollTop = 0;
    }
    // console.log(ps.current.scrollTop);
  }, [location]);
  return (
    <>
      <PerfectScrollbar
        containerRef={(el) => (ps.current = el)}
        options={{
          wheelSpeed: 0.7,
          suppressScrollX: true,
          wheelPropagation: true,
        }}
      >
        {children}
      </PerfectScrollbar>
    </>
  );
};
