import { Button, Form, Input } from 'antd';
import React from 'react';

const CommentAdder = () => {
  return (
    <>
      <Form>
        <div
          style={{
            backgroundColor: '#F3F5F7',
            padding: '28px',
            display: 'flex',
          }}
        >
          <span style={{ width: '51px' }}>
            <img
              style={{ width: '38px', height: '38px' }}
              src="https://sgimage.netmarble.com/images/netmarble/enn/20210407/l8tl1617776607050.png"
            ></img>
          </span>
          <span style={{ width: '600px', marginRight: '10px' }}>
            <Form.Item>
              <Input style={{ height: '64px' }} />
            </Form.Item>
          </span>
          <span>
            <Form.Item>
              <Button
                style={{
                  width: '88px',
                  height: '64px',
                  backgroundColor: '#818e9a',
                  color: '#f1f2f3',
                }}
              >
                등록
              </Button>
            </Form.Item>
          </span>
        </div>
      </Form>
    </>
  );
};

export default CommentAdder;
