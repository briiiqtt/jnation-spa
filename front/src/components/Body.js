import React from 'react';

const Body = ({ children, noPadding = false }) => {
  return (
    <>
      <div style={{ width: '860px' }}>
        {noPadding ? (
          <div style={{ padding: '20px' }}>{children}</div>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default Body;
