import 'antd/dist/antd.min.css';
import './css/app.css';
import React, { useEffect } from 'react';

import axios from 'axios';

import PcLayout from './layouts/PCLayout';

const App = () => {
  return (
    <>
      <PcLayout></PcLayout>
    </>
  );
};

export default App;
