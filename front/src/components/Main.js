import React, { useState } from 'react';

const Main = () => {
  return (
    <>
      <Mainbanner />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <MainYoutube />
        <MainTabs />
      </div>
      <BelowBanners />
      <MainLittleBoard boardName="dd" />
    </>
  );
};

export default Main;

const Mainbanner = () => {
  return (
    <>
      <img
        style={{ width: '100%' }}
        src="https://sgimage.netmarble.com/images/netmarble/enn/20220728/gaco1658997238633.png"
      />
    </>
  );
};

const MainYoutube = () => {
  return (
    <>
      <iframe
        width="580"
        height="294"
        src="https://www.youtube.com/embed/Q8JY_YzSjew"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
};

const MainTabs = () => {
  const [tabs, setTabs] = useState([
    {
      key: 0,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20210617/ejxm1623921106723.jpg',
    },
    {
      key: 1,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20210617/ckcm1623921147617.jpg',
    },
    {
      key: 2,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20210617/ki7g1623921165875.jpg',
    },
    {
      key: 3,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20210617/hwwz1623921188479.jpg',
    },
  ]);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tabs.map((tab) => (
          <img key={tab.key} style={{ width: '280px' }} src={tab.imgSrc}></img>
        ))}
      </div>
    </>
  );
};

const BelowBanners = () => {
  const [banners, setBanners] = useState([
    {
      key: 0,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20221117/f02h1668649428416.jpg',
    },
    {
      key: 1,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20221110/nrzo1668063853053.jpg',
    },
    {
      key: 2,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20220624/nc321656060936457.jpg',
    },
    {
      key: 3,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20220623/wgrd1655971448321.jpg',
    },
    {
      key: 4,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20220512/6eaf1652337249565.jpg',
    },
    {
      key: 5,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20210715/qrqt1626336304211.jpg',
    },
    {
      key: 6,
      imgSrc:
        'https://sgimage.netmarble.com/images/netmarble/enn/20220728/plye1658972198399.jpg',
    },
  ]);
  return (
    <>
      <div>
        {banners.map((banner) => (
          <img key={banner.key} src={banner.imgSrc}></img>
        ))}
      </div>
    </>
  );
};

const MainLittleBoard = (boardName) => {
  const [posts, setPosts] = useState([
    { key: 0, title: 'title1', content: 'content1' },
    { key: 1, title: 'title1', content: 'content1' },
    { key: 2, title: 'title1', content: 'content1' },
  ]);
  return (
    <>
      <div>
        <div>
          <span>{'boardName'}</span>
          <span>
            <i></i>
          </span>
        </div>
        <div>
          {posts.map((post) => (
            <span key={post.key}>
              <span>{post.content}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
