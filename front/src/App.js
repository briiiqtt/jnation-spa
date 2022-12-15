import 'antd/dist/antd.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/app.css';

import NotFound from './components/404';
import BoardLayout from './layouts/BoardLayout';
import Join from './pages/Join';

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
