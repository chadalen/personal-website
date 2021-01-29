import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Markdown({ htmlContent, className }) {
  return (
    <article
      className={clsx('prose lg:prose-xl px-8 m-auto my-16', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

Markdown.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  className: '',
};
