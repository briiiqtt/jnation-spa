import { Form, Input } from 'antd';
import React from 'react';

const CommentAdder = () => {
  return (
    <>
      <div
        style={{ backgroundColor: '#F3F5F7', padding: '28px', display: 'flex' }}
      >
        <span style={{ width: '5%' }}>
          <img
            style={{ width: '38px', height: '38px' }}
            src="https://sgimage.netmarble.com/images/netmarble/enn/20210407/l8tl1617776607050.png"
          ></img>
        </span>
        <span style={{ width: '90%' }}>
          <Form>
            <Form.Item>
              <Input />
            </Form.Item>
          </Form>
        </span>
      </div>
    </>
  );
};

export default CommentAdder;
