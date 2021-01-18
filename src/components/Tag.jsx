import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Tag({ className, value }) {
  return (
    <div
      className={clsx(
        'inline-block px-2 py-1 border rounded bg-gray-200',
        className,
      )}
    >
      {value}
    </div>
  );
}

Tag.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  className: '',
};
