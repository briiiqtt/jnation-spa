import React from 'react';
import Board from '../components/Board/Board';
import Body from '../components/Body';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const PCLayout = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: `calc(100vh - 50px)`,
            overflowY: 'scroll',
            msOverflowStyle: 'none',
          }}
        >
          <Sidebar />
          <Body>
            <Routes>
              <Route path="/board/:boardId" element={<Board />}></Route>
            </Routes>
          </Body>
        </div>
      </BrowserRouter>
    </>
  );
};

export default PCLayout;
