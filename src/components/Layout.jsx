import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />

        <div className="flex-grow" style={{ paddingTop: '64px' }}>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 px-2 pt-2">
              {children}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <style global jsx>{`
        html, body, #__next {
          min-height: 100vh;
        }
        `}
      </style>
    </>
  );
}
