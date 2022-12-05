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
        src="http://13.124.184.111:50080/resources/484a1158-9080-4946-98b8-80247624559a.png"
      />
    </>
  );
};

const MainYoutube = () => {
  return (
    <>
      <iframe
        width="100%"
        height="353px"
        src="https://www.youtube.com/embed/OPm_ahpqREg"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </>
  );
};

const MainTabs = () => {
  const [tabs, setTabs] = useState([
    {
      key: 0,
      imgSrc: 'http://13.124.184.111:50080/resources/barogagi_1.png',
    },
    {
      key: 1,
      imgSrc: 'http://13.124.184.111:50080/resources/barogagi_2.png',
    },
    {
      key: 2,
      imgSrc: 'http://13.124.184.111:50080/resources/barogagi_3.png',
    },
    {
      key: 3,
      imgSrc: 'http://13.124.184.111:50080/resources/barogagi_4.png',
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
        'http://13.124.184.111:50080/resources/58ad8c1e-8c26-41ea-b6d6-87764ddc9b9f.png',
    },
    {
      key: 1,
      imgSrc:
        'http://13.124.184.111:50080/resources/8c31c2ad-f4f7-4b07-8d72-a1e0be092096.png',
    },
    {
      key: 2,
      imgSrc:
        'http://13.124.184.111:50080/resources/a4cc7d2b-8935-46a5-b3b2-2e657ebbecaa.png',
    },
  ]);
  return (
    <>
      <div>
        {banners.map((banner) => (
          <img
            key={banner.key}
            src={banner.imgSrc}
            style={{ width: '100%' }}
          ></img>
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
