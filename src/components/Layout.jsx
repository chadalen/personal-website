import React from 'react';
import Navbar from './Navbar';

export default ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-12" style={{ paddingTop: '64px' }}>
        <div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 p-2">{children}</div>
      </div>
    </>
  );
};
