import React from 'react';
import clsx from 'clsx';

interface CardProp {
  children: React.ReactChildren;
  className: String;
}

function Card({ children, className }: CardProp) {
  return (
    <div
      className={clsx(
        'bg-white p-4 border-b border-gray-200 shadow rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
