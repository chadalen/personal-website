import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <>
      <Head>
        <title>Chad Alen - Home</title>
        <meta name="Description" content="Chad Alen's personal website." />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Head>

      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div
          id="intro"
          className="w-full flex-grow flex justify-center items-center"
          style={{ paddingTop: '64px' }}
        >
          <div className="flex justify-center items-center flex-col">
            <img
              src="/images/avatar-circle-384x384.png"
              alt="Avatar"
              className="mb-4"
            />
            <div className="whitespace-pre text-3xl">
              {'Hello I\'m'}
              <span className="text-pink-600">{' Chad Adams'}</span>
              .
            </div>
            <div className="whitespace-pre text-3xl">
              {'I\'m a Software Developer.'}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
