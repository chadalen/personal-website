import React from 'react';
import clsx from 'clsx';

interface MarkdownProp {
  htmlContent: string;
  className: string;
}

function Markdown({ htmlContent, className }: MarkdownProp) {
  return (
    <article
      className={clsx('prose lg:prose-xl px-8 m-auto my-16', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default Markdown;
