import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

function Breadcrumb({ children, className, ...props }) {
  return (
    <ul className={clsx('breadcrumb', className)} {...props}>
      {children}
    </ul>
  );
}

function BreadcrumbItem({ children, className, to, ...props }) {
  if (to) {
    return (
      <>
        <li
          className={clsx(
            'inline-block mr-2 text-base text-gray-400 hover:underline',
            className
          )}
          {...props}
        >
          <Link href={to}>{children}</Link>
        </li>

        <li className="inline-block mr-2 text-base">/</li>
      </>
    );
  }

  return (
    <li className={clsx('inline-block mr-2 text-base', className)} {...props}>
      {children}
    </li>
  );
}

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
