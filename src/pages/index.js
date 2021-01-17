import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        id="intro"
        className="w-full flex-grow flex justify-center items-center"
        style={{ paddingTop: '64px' }}
      >
        <div className="flex justify-center items-center flex-col">
          <img
            src="/images/avatar-circle.png"
            alt="Avatar"
            className="mb-4"
            style={{ maxWidth: '384px' }}
          />
          <div className="whitespace-pre text-3xl">
            Hello, I'm <span className="text-pink-600">Chad Adams</span>.
          </div>
          <div className="whitespace-pre text-3xl">
            I'm a Software Developer.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
