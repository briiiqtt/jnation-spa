import 'antd/dist/antd.min.css';
import './css/app.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import BoardLayout from './layouts/BoardLayout';
import Main from './components/Main';
import { Header } from 'antd/lib/layout/layout';
import JoinPage from './pages/JoinPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/join" element={<JoinPage />}></Route>
          <Route path="/*" element={<BoardLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
