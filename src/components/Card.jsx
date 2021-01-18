import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Card({ children, className }) {
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

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};
