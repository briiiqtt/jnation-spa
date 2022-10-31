import { BellFilled } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import { Popover } from 'antd';

const Notification = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hide = () => {
    setClicked(false);
    setHovered(false);
  };
  const handleHoverChange = (open) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open) => {
    setHovered(false);
    setClicked(open);
  };
  const [notifications, setNotifications] = useState([
    { key: 0, title: 'notify title1', type: 0, content: 'notify content1' },
    { key: 1, title: 'notify title2', type: 0, content: 'notify content2' },
    { key: 2, title: 'notify title3', type: 0, content: 'notify content3' },
    { key: 3, title: 'notify title4', type: 0, content: 'notify content4' },
    { key: 4, title: 'notify title5', type: 0, content: 'notify content5' },
  ]);

  const noNotifyOuterStyle = useMemo(() => ({
    height: '225px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
  }));
  const notifyOuterStyle = useMemo(() => ({
    height: '225px',
    overflowX: 'hidden',
    overflowY: 'auto',
  }));
  const notifyStyle = useMemo(() => ({
    padding: '5px',
    textAlign: 'center',
    borderTop: '1px solid lightgray',
  }));

  const notificationContent = useMemo(() => (
    <div style={{ width: '400px', height: '250px' }}>
      {notifications.length === 0 ? (
        <div style={noNotifyOuterStyle}>새로운 소식이 없습니다.</div>
      ) : (
        <>
          <div style={notifyOuterStyle}>
            {notifications.map((notify) => (
              <div key={notify.key} style={notifyStyle}>
                <div>{notify.title}</div>
                <div>{notify.content}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        style={{
          height: '25px',
          borderTop: '1px solid #eeeeee',
          textAlign: 'center',
        }}
      >
        내 소식 바로가기
      </div>
    </div>
  ));

  return (
    <>
      <Popover
        placement="bottomRight"
        title={'알림'}
        content={notificationContent}
        trigger="hover"
        open={hovered}
        onOpenChange={handleHoverChange}
      >
        <Popover
          placement="bottomRight"
          title={'알림'}
          content={notificationContent}
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
        >
          <BellFilled />
        </Popover>
      </Popover>
    </>
  );
};

export default Notification;
