import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Markdown({ htmlContent, className }) {
  return (
    <>
      <div
        className={clsx('markdown px-4 pb-4', className)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <style global jsx>
        {`
          .markdown h2 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: bold;
            font-size: 2.25rem;
            line-height: 2.5rem;
          }

          .markdown h3 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: bold;
            font-size: 1.875rem;
            line-height: 2.25rem;
          }

          .markdown p {
            margin-top: 1rem;
            margin-bottom: 1rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .markdown ul {
            padding-left: 1.5rem;
          }

          .markdown li {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            list-style-type: disc;
          }

          .markdown ol {
            padding-left: 1.5rem;
          }

          .markdown li {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            list-style-type: decimal;
          }

          .markdown li::marker {
            font-weight: 600;
          }

          .markdown a {
            color: rgb(51, 122, 183);
            text-decoration-color: rgb(51, 122, 183);
          }

          .markdown a:hover {
            color: #23527c;
            text-decoration: underline;
          }

          .markdown img {
            border-radius: 0.25rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .markdown pre {
            border-radius: 0.50rem;
          }
        `}
      </style>
    </>
  );
}

Markdown.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  className: '',
};
