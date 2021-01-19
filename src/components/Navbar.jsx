import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

const NavbarLink = React.forwardRef(({
  href,
  onClick,
  className,
  value,
}, ref) => (
  <a href={href} onClick={onClick} className={className} ref={ref}>
    {value}
  </a>
));

NavbarLink.propTypes = {
  value: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

NavbarLink.defaultProps = {
  href: '',
  className: '',
  onClick: () => { },
};

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className={clsx({ block: !open }, { hidden: open }, 'h-6 w-6')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={clsx({ hidden: !open }, { block: open }, 'h-6 w-6')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" passHref>
                <NavbarLink
                  className="text-xl font-bold text-gray-300 hover:text-white"
                  value="Chad Adams"
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/about" passHref>
                  <NavbarLink
                    className={clsx(
                      'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium',
                      {
                        'text-white bg-gray-900 hover:bg-gray-900':
                          router.asPath === '/#about',
                      },
                      {
                        'text-gray-300': !(router.asPath === '/#about'),
                      },
                    )}
                    value="About"
                  />
                </Link>

                <Link href="/blog" passHref>
                  <NavbarLink
                    className={clsx(
                      'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium',
                      {
                        'text-white bg-gray-900 hover:bg-gray-900':
                          router.pathname === '/blog',
                      },
                      {
                        'text-gray-300': !(router.pathname === '/blog'),
                      },
                    )}
                    value="Blogs"
                  />
                </Link>
                <Link href="/projects" passHref>
                  <NavbarLink
                    className={clsx(
                      'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium',
                      {
                        'text-white bg-gray-900 hover:bg-gray-900':
                          router.pathname === '/projects',
                      },
                      {
                        'text-gray-300': !(router.pathname === '/projects'),
                      },
                    )}
                    value="Projects"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx({ hidden: !open, block: open }, 'sm:hidden')}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/about" passHref>
            <NavbarLink
              className={clsx(
                'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium',
                {
                  'text-white bg-gray-900 hover:bg-gray-900':
                    router.pathname === '/about',
                },
              )}
              value="About"
            />
          </Link>

          <Link href="/blog" passHref>
            <NavbarLink
              className={clsx(
                'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium',
                {
                  'text-white bg-gray-900 hover:bg-gray-900':
                    router.pathname === '/blog',
                },
              )}
              value="Blogs"
            />
          </Link>
          <Link href="/projects" passHref>
            <NavbarLink
              className={clsx(
                'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-base font-medium',
                {
                  'text-white bg-gray-900 hover:bg-gray-900':
                    router.pathname === '/projects',
                },
              )}
              value="Projects"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
