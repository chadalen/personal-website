import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faDev,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

function Footer(): React.ReactElement {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-800 py-10">
        <div className="flex justify-center items-center">
          <a
            href="https://www.linkedin.com/in/chadalen/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FontAwesomeIcon
              className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
              icon={faLinkedinIn}
              style={{ width: '16px', height: '16px' }}
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
              style={{ width: '17.5px', height: '20px' }}
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
              style={{ width: '20px', height: '20px' }}
            />
          </a>

          <a href="mailto: me@chadalen.com" title="Contact me">
            <FontAwesomeIcon
              className="text-gray-400 hover:text-gray-300 cursor-pointer text-xl mr-5"
              icon={faEnvelope}
              style={{ width: '20px', height: '20px' }}
            />
          </a>
        </div>

        <div className="flex justify-center items-center whitespace-pre mt-2 text-white">
          <span>
            Made with
            {' '}
          </span>
          <FontAwesomeIcon
            className="text-red-600"
            icon={faHeart}
            style={{ width: '16px', height: '16px' }}
          />
          <span>
            {' '}
            by Chad Adams
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
