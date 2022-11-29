import { UserOutlined } from '@ant-design/icons';
import React, { useMemo, useState, useCallback } from 'react';
import { Popover } from 'antd';
import { Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { action_logout } from '../../reducers/userReducer';

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const onLogoutBtn = useCallback(() => {
    hide();
    dispatch(action_logout());
  });

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

  const me = useSelector((state) => state.user.me);

  const profile = useMemo(() => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar style={{ bottom: '3px' }} size={50} icon={<UserOutlined />} />
        <span style={{ fontSize: '1.5rem', margin: '0px 10px' }}>
          {me.nickname} ({me.id})
        </span>
      </div>
    );
  });

  const notificationContent = useMemo(() => (
    <div style={{ width: '400px', height: '250px' }}>
      내용
      <div
        style={{
          height: '25px',
          borderTop: '1px solid #eeeeee',
          textAlign: 'center',
        }}
      >
        <button onClick={onLogoutBtn}>로그아웃</button>
      </div>
    </div>
  ));

  return (
    <>
      <Popover
        placement="bottomRight"
        title={profile}
        content={notificationContent}
        trigger="hover"
        open={hovered}
        onOpenChange={handleHoverChange}
      >
        <Popover
          placement="bottomRight"
          title={profile}
          content={notificationContent}
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
        >
          <Avatar
            style={{ bottom: '3px', cursor: 'pointer' }}
            size={27}
            icon={<UserOutlined />}
          />
        </Popover>
      </Popover>
    </>
  );
};

export default ProfileDropdown;
