import React from 'react';
import TopLayout from './TopLayout';
require("prismjs/themes/prism-tomorrow.css")

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};