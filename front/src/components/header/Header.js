import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import React, { useMemo, useCallback } from 'react';
import HeaderButtons from './HeaderButtons';
const { Search } = Input;

const Header = () => {
  const headerStyle = useMemo(() => ({
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#2d2121',
    zIndex: '1',
    padding: '4px 0px',
  }));
  const style2 = useMemo(() => ({
    height: '58px',
  }));
  const style3 = useMemo(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));
  const logoImageClicked = useCallback(() => {
    // location.href = __dirname;
  });
  return (
    <>
      <div style={headerStyle}>
        <Row>
          <Col span={8} style={style3}>
            <img src="https://sgimage.netmarble.com/images/netmarble/enn/20210407/tpew1617761984326.png"
            onClick={logoImageClicked}
            style={{cursor: 'pointer'}}></img>
          </Col>
          <Col span={8} style={style3}>
            <Search
              placeholder="검색"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              //   onSearch={onSearch}
              style={{ backgroundColor: '#827d7d' }}
            />
          </Col>
          <Col span={8} style={style3}>
            <HeaderButtons />
          </Col>
        </Row>
      </div>
      <div style={style2}></div>
    </>
  );
};
export default Header;
