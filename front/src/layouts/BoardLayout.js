import React, { useEffect } from 'react';
import Board from '../components/Board/Board';
import Body from './Body';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

import { Routes, Route } from 'react-router-dom';
import MenuManager from '../components/manage/MenuManager';
import PostAdder from '../components/Board/PostAdder';
import PostViewer from '../components/Board/PostViewer';
import NotFound from '../components/404';
import Main from '../pages/Main';
import { ScrollContainer } from '../components/common';
import Post from '../pages/Post';

const BoardLayout = () => {
  return (
    <>
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
                <Route path="/:boardUID" element={<Board />}></Route>
                <Route path="/:boardUID/:page" element={<Board />}></Route>
                <Route path="/post/add" element={<PostAdder />}></Route>
                <Route path="/post/:postUID" element={<Post />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
              </Routes>
            </Body>
          </div>
        </ScrollContainer>
        <RightBanner />
      </div>
    </>
  );
};

export default BoardLayout;

const LeftBanner = () => {
  return (
    <div
      style={{
        width: 'calc((100vw - 1128px)/2)', //+6px은 스크롤바 width건드린거땜에
        display: 'flex',
        flexDirection: 'row-reverse',
        overflow: 'hidden',
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url("http://13.124.184.111:50080/resources/9e61bb8a-5f17-4913-bcac-0f075bf808d9.png")`,
      }}
    >
      {/* <img
        style={{ objectFit: 'none', objectPosition: 'right top' }}
        // src="https://sgimage.netmarble.com/images/netmarble/enn/20220728/bhst1658997251182.jpg"
        src="http://13.124.184.111:50080/resources/9e61bb8a-5f17-4913-bcac-0f075bf808d9.png"
      ></img> */}
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
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url("http://13.124.184.111:50080/resources/67080f7c-0f0b-45db-8a52-f33bb253ea5e.png")`,
      }}
    >
      {/* <img
        style={{ objectFit: 'none', objectPosition: 'left top' }}
        // src="https://sgimage.netmarble.com/images/netmarble/enn/20220728/qjsp1658997256535.jpg"
        src="http://13.124.184.111:50080/resources/67080f7c-0f0b-45db-8a52-f33bb253ea5e.png"
      ></img> */}
    </div>
  );
};
