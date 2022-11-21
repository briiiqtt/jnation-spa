import React, { useEffect } from 'react';
import Board from '../components/Board/Board';
import Body from '../components/Body';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuManager from '../components/Manager/MenuManager';
import PostAdder from '../components/Board/PostAdder';
import PostViewer from '../components/Board/PostViewer';
import NotFound from '../components/404';

const PCLayout = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: `calc(100vh - 58px)`,
            overflowY: 'scroll',
            msOverflowStyle: 'none',
          }}
        >
          <Sidebar />
          <Body>
            <Routes>
              <Route path="/manage" element={<MenuManager />}></Route>

              <Route path="/board/:boardUID" element={<Board />}></Route>
              <Route path="/board/:boardUID/:page" element={<Board />}></Route>

              <Route path="/board/post/add" element={<PostAdder />}></Route>
              <Route
                path="/board/post/:postUID"
                element={<PostViewer />}
              ></Route>

              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Body>
        </div>
      </BrowserRouter>
    </>
  );
};

export default PCLayout;
