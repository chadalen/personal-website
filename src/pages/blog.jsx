import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';
import { getAllBlogs } from '../../lib/api';
import DateFormatter from '../components/DateFormatter';

const BlogCard = ({ blog }) => (
  <Card className="mb-4">
    <div className="flex">
      <div>
        <div className="flex items-center mb-2">
          <img
            src="/images/avatar-circle-90x90.png"
            alt="Avatar"
            className="inline-block mr-2"
            style={{ width: '48px', height: '48px' }}
          />

          <div className="inline-block text-base">
            <div className="font-bold">Chad Adams</div>

            <DateFormatter
              className="inline-block text-sm text-gray-500 mr-2"
              dateString={blog.date}
              formatString="MMM d, yyyy"
            />

            <div className="inline-block text-sm text-gray-500">
              {`(${blog.ago})`}
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>

        <div>
          {blog.tags
          && blog.tags.map((tag) => (
            <Tag key={tag} className="mr-2 mb-2" value={tag} />
          ))}
        </div>
      </div>
    </div>
    <hr className="mb-4 mt-2" />
    <p className="text-base mb-2">{blog.excerpt}</p>
    <p className="inline-block text-base">{blog.timeToRead}</p>
  </Card>
);

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    timeToRead: PropTypes.string.isRequired,
    ago: PropTypes.string.isRequired,
  }).isRequired,
};

const BlogLink = React.forwardRef(({ href, onClick, blog }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <BlogCard blog={blog} />
  </a>
));

BlogLink.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    timeToRead: PropTypes.string.isRequired,
    ago: PropTypes.string.isRequired,
  }).isRequired,
};

BlogLink.defaultProps = {
  href: '',
  onClick: () => {},
};

export default function Page({ blogs }) {
  return (
    <>
      <Head>
        <title>Chad Alen - Blogs</title>
        <meta
          name="Description"
          content="Blogs written by Chad Alen."
        />
      </Head>

      <Layout>
        <Breadcrumb className="mb-4 mt-2">
          <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Blog</Breadcrumb.Item>
        </Breadcrumb>

        {blogs.map((blog) => (
          <Link key={blog.title} href={`/blog/${blog.slug}`} passHref>
            <BlogLink blog={blog} />
          </Link>
        ))}
      </Layout>
    </>
  );
}

Page.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      timeToRead: PropTypes.string.isRequired,
      ago: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export async function getStaticProps() {
  const blogs = getAllBlogs([
    'title',
    'date',
    'tags',
    'excerpt',
    'timeToRead',
    'ago',
    'slug',
  ]);
  return {
    props: { blogs },
  };
}
