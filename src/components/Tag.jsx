import React from 'react';
import clsx from 'clsx';

export default ({ children, className, ...props }) => {
  return (
    <div className={clsx('inline-block px-2 py-1 border rounded bg-gray-200', className)} {...props}>
      {children}
    </div>    
  )
}
