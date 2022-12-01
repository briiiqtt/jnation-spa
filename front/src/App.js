import 'antd/dist/antd.min.css';
import './css/app.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import BoardLayout from './layouts/BoardLayout';
import Main from './pages/Main';
import { Header } from 'antd/lib/layout/layout';
import Join from './pages/Join';
import NotFound from './components/404';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardLayout />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/board/*" element={<BoardLayout />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
