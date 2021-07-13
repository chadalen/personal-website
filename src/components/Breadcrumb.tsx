import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface BreadcrumbItemProp {
  children: React.ReactChildren;
  className: string;
  to: string;
}

function BreadcrumbItem({ children, className, to }: BreadcrumbItemProp): React.ReactElement {
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

interface BreadcrumbProp {
  children: React.ReactChildren;
  className: string;
}

function Breadcrumb({ children, className }: BreadcrumbProp): React.ReactElement {
  return (
    <ul aria-label="breadcrumb" className={clsx('breadcrumb', className)}>
      {children}
    </ul>
  );
}

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
