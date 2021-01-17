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
          <a
            href="https://www.linkedin.com/in/chadalen/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FontAwesomeIcon
              className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
              icon={faLinkedinIn}
            />
          </a>

          <a
            href="https://dev.to/chadalen"
            target="_blank"
            rel="noreferrer"
            title="Dev"
          >
            <FontAwesomeIcon
              className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
              icon={faDev}
            />
          </a>

          <a
            href="https://github.com/chadalen"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <FontAwesomeIcon
              className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
              icon={faGithub}
            />
          </a>

          <a
            href="mailto: me@chadalen.com"
            title="Contact me"
          >
            <FontAwesomeIcon
              className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
              icon={faEnvelope}
            />
          </a>
        </div>
      </div>
    </>
  );
}
