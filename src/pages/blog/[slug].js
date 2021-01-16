import React from 'react';
import Layout from '../../components/layout';
// import ReactDisqusComments from 'react-disqus-comments';
import Card from '../../components/Card';
import Tag from '../../components/Tag';
import DateFormatter from '../../components/DateFormatter';
import Breadcrumb from '../../components/Breadcrumb';
import { getAllBlogs, getBlogBySlug } from '../../../lib/api';
import { markdownToHtml } from '../../util';
// import styled from 'styled-components';

// const Content = styled.div`
//   h1 {
//     font-size: 2.25rem;
//     line-height: 2.5rem;
//     font-weight: bold;
//   }

//   h2 {
//     font-size: 1.875rem;
//     line-height: 2.25rem;
//     font-weight: bold;
//   }

//   h3 {
//     font-size: 1.5rem;
//     line-height: 2rem;
//     font-weight: bold;
//   }

//   li {
//     list-style-type: disc;
//   }
// `;

export default function Page({ blog }) {
  return (
    <Layout>
      <Breadcrumb aria-label="breadcrumb" className="mb-4 mt-2">
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>
        <Breadcrumb.Item to={'/blog'}>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{blog.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-4">
        <div className="flex">
          <div>
            <h1 className="text-2xl font-bold">{blog.title}</h1>

            <div>
              {blog.tags &&
                blog.tags.map((tag, index) => {
                  return (
                    <Tag key={index} className="mr-2 mb-2">
                      {tag}
                    </Tag>
                  );
                })}
            </div>

            <div className="flex items-center mb-2">
              <img
                src="/images/avatar-circle.png"
                alt="Avatar"
                className="rounded inline-block mr-2"
                style={{ width: '48px' }}
              />

              <div className="inline-block text-base">
                <div className="font-bold">Chad Adams</div>

                <div className="text-sm text-gray-500">
                  <DateFormatter
                    className="mr-2"
                    dateString={blog.date}
                    formatString="MMM d, yyyy"
                  />
                  &#8226; {blog.timeToRead}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-4 mt-2" />

        <div
          className="text-base px-4 pb-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </Card>

      {/* <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      /> */}
    </Layout>
  );
}

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
    paths: blogs.map((blog) => {
      return {
        params: {
          slug: blog.slug,
        },
      };
    }),
    fallback: false,
  };
}
