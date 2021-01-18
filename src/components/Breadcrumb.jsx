import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';

function BreadcrumbItem({ children, className, to }) {
  if (to) {
    return (
      <>
        <li
          className={clsx(
            'inline-block mr-2 text-base text-gray-400 hover:underline',
            className,
          )}
        >
          <Link href={to}>{children}</Link>
        </li>
        <li className="inline-block mr-2 text-base">/</li>
      </>
    );
  }

  return (
    <li className={clsx('inline-block mr-2 text-base', className)}>
      {children}
    </li>
  );
}

BreadcrumbItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  className: '',
  to: '',
};

function Breadcrumb({ children, className }) {
  return (
    <ul aria-label="breadcrumb" className={clsx('breadcrumb', className)}>
      {children}
    </ul>
  );
}

Breadcrumb.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

Breadcrumb.defaultProps = {
  className: '',
};

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
