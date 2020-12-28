import React from 'react';
import Navbar from './Navbar';

export default ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-8">{children}</div>
      </div>
    </>
  );
};
