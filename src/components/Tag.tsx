import React from 'react';
import clsx from 'clsx';

interface TagProp {
  className: string;
  value: string;
}

function Tag({ className, value }: TagProp) {
  return (
    <div
      className={clsx(
        'inline-block p-1 border rounded bg-gray-200 text-xs sm:text-sm',
        className,
      )}
    >
      {`#${value}`}
    </div>
  );
}

export default Tag;
