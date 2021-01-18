import React from 'react';
import PropTypes from 'prop-types';
import { getAbout } from '../../lib/api';
import Markdown from '../components/Markdown';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { markdownToHtml } from '../util';

export default function Page({ htmlContent }) {
  return (
    <Layout>
      <Breadcrumb className="mb-4 mt-2">
        <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>About</Breadcrumb.Item>
      </Breadcrumb>
      <Markdown htmlContent={htmlContent} />
    </Layout>
  );
}

Page.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};

export async function getStaticProps() {
  const content = getAbout();

  const htmlContent = await markdownToHtml(content);

  return {
    props: { htmlContent },
  };
}
