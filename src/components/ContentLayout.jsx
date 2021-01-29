import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ContentLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <div className="flex-grow" style={{ paddingTop: '64px' }}>
        {children}
      </div>

      <Footer />
    </div>
  );
}

ContentLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
