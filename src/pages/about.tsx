import React from 'react';
import Head from 'next/head';
import { getAbout } from '../../lib/api';
import Markdown from '../components/Markdown';
import Layout from '../components/ContentLayout';
import { markdownToHtml } from '../util';

interface Props {
  htmlContent: string;
}

function Page({ htmlContent }: Props): React.ReactElement {
  return (
    <>
      <Head>
        <title>Chad Alen - About</title>
        <meta name="Description" content="A brief background about who Chad Alen is." />
      </Head>

      <Layout>
        <Markdown htmlContent={htmlContent} />
      </Layout>
    </>
  );
}

interface StaticProps {
  props: Props;
}

export async function getStaticProps(): Promise<StaticProps> {
  const content = getAbout();

  const htmlContent = await markdownToHtml(content);

  return {
    props: { htmlContent },
  };
}

export default Page;
