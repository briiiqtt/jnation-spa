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
import Main from '../components/Main';
import { ScrollContainer } from '../components/common';

const PCLayout = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'calc(100vh - 58px)',
          }}
        >
          <LeftBanner />
          <Sidebar />
          <ScrollContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: `calc(100vh - 58px)`,
                // overflowY: 'scroll',
                // msOverflowStyle: 'none',
              }}
            >
              <Body>
                <Routes>
                  <Route path="/" element={<Main />}></Route>
                  <Route path="/manage" element={<MenuManager />}></Route>

                  <Route path="/board/:boardUID" element={<Board />}></Route>
                  <Route
                    path="/board/:boardUID/:page"
                    element={<Board />}
                  ></Route>

                  <Route path="/board/post/add" element={<PostAdder />}></Route>
                  <Route
                    path="/board/post/:postUID"
                    element={<PostViewer />}
                  ></Route>

                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
              </Body>
            </div>
          </ScrollContainer>
          <RightBanner />
        </div>
      </BrowserRouter>
    </>
  );
};

export default PCLayout;

const LeftBanner = () => {
  return (
    <div
      style={{
        width: 'calc((100vw - 1128px)/2)', //+6px은 스크롤바 width건드린거땜에
        display: 'flex',
        flexDirection: 'row-reverse',
        overflow: 'hidden',
        // backgroundImage: `url("https://sgimage.netmarble.com/images/netmarble/enn/20220728/bhst1658997251182.jpg")`,
      }}
    >
      <img
        style={{ objectFit: 'none', objectPosition: 'right top' }}
        src="https://sgimage.netmarble.com/images/netmarble/enn/20220728/bhst1658997251182.jpg"
      ></img>
    </div>
  );
};

const RightBanner = () => {
  return (
    <div
      style={{
        width: 'calc((100vw - 1128px)/2)',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        // backgroundImage: `url("https://sgimage.netmarble.com/images/netmarble/enn/20220728/bhst1658997251182.jpg")`,
      }}
    >
      <img
        style={{ objectFit: 'none', objectPosition: 'left top' }}
        src="https://sgimage.netmarble.com/images/netmarble/enn/20220728/qjsp1658997256535.jpg"
      ></img>
    </div>
  );
};
