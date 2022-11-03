import React from 'react';

import { Select } from 'antd';

const { Option } = Select;

const BoardTypeSelect = () => {
  return (
    <>
      <Select
        defaultValue="lucy"
        style={{
          width: 120,
        }}
        onChange={''}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </>
  );
};

export default BoardTypeSelect;
