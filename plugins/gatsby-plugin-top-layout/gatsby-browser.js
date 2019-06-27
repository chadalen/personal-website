import React from 'react';
import TopLayout from './TopLayout';
import "../../src/styles/global.css"

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};