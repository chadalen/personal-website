import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import Layout from '../../components/Layout';
// import ReactDisqusComments from 'react-disqus-comments';
import Card from '../../components/Card';
import Tag from '../../components/Tag';
import DateFormatter from '../../components/DateFormatter';
import Breadcrumb from '../../components/Breadcrumb';
import { getAllBlogs, getBlogBySlug } from '../../../lib/api';
import { markdownToHtml } from '../../util';
import Markdown from '../../components/Markdown';

hljs.registerLanguage('javascript', javascript);

export default function Page({ blog }) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <>
      <Head>
        <title>{`Chad Alen - ${blog.title}`}</title>
        <meta name="Description" content="A blog written by Chad Alen." />
      </Head>

      <Layout>
        <Breadcrumb className="mb-4 mt-2">
          <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item to="/blog">Blog</Breadcrumb.Item>
          <Breadcrumb.Item>{blog.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <div className="flex">
            <div>
              <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>

              <div className="mb-2">
                {blog.tags
                  && blog.tags.map((tag) => (
                    <Tag key={tag} className="mr-2 mb-2" value={tag} />
                  ))}
              </div>

              <div className="flex items-center mb-2">
                <img
                  src="/images/avatar-circle-90x90.png"
                  alt="Avatar"
                  className="inline-block mr-2"
                  style={{ width: '48px', height: '48px' }}
                />

                <div className="inline-block text-base">
                  <div className="font-bold">Chad Adams</div>

                  <div className="text-sm text-gray-500">
                    <DateFormatter
                      className="inline-block mr-2"
                      dateString={blog.date}
                      formatString="MMM d, yyyy"
                    />
                    &#8226;
                    {` ${blog.timeToRead}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mb-4 mt-1" />
          <Markdown htmlContent={blog.content} />
        </Card>

        {/* <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      /> */}
      </Layout>
    </>
  );
}

Page.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    timeToRead: PropTypes.string.isRequired,
  }).isRequired,
};

export async function getStaticProps({ params }) {
  const blog = getBlogBySlug(params.slug, [
    'title',
    'date',
    'tags',
    'excerpt',
    'timeToRead',
    'ago',
    'slug',
    'content',
  ]);

  const content = await markdownToHtml(blog.content);

  return {
    props: {
      blog: {
        ...blog,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const blogs = getAllBlogs(['slug']);

  return {
    paths: blogs.map((blog) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: false,
  };
}
