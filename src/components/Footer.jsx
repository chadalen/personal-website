import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faDev,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <>
      <div className="flex justify-center items-center bg-gray-800 py-4">
        <div className="flex">
          <FontAwesomeIcon
            title="LinkedIn"
            className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
            icon={faLinkedinIn}
          />

          <FontAwesomeIcon
            title="Dev"
            className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
            icon={faDev}
          />

          <FontAwesomeIcon
            title="GitHub"
            className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
            icon={faGithub}
          />

          <FontAwesomeIcon
            title="Contact me"
            className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
            icon={faEnvelope}
          />
        </div>
      </div>
    </>
  );
}
