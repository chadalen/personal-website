import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ReactDisqusComments from 'react-disqus-comments';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';
import styled from 'styled-components';

const Content = styled.div`
  h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: bold;
  }

  h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: bold;
  }

  li {
    list-style-type: disc;
  }
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Breadcrumb aria-label="breadcrumb" className="mb-4 mt-2">
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>
        <Breadcrumb.Item to={'/blog'}>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{post.frontmatter.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-4">
        <div className="flex">
          <div>
            <h1 className="text-2xl font-bold">{post.frontmatter.title}</h1>

            <div>
              {post.frontmatter.tags &&
                post.frontmatter.tags.map((data, index) => {
                  return (
                    <Tag key={index} className="mr-2 mb-2">
                      {data}
                    </Tag>
                  );
                })}
            </div>

            <div className='flex items-center mb-2'>
              <img
                src={data.file.childImageSharp.resize.src}
                alt="Avatar"
                className="rounded inline-block mr-2"
              />

              <div className="inline-block text-base">
                <div className="font-bold">Chad Adams</div>
                <div className="text-base text-gray-400">
                  {post.frontmatter.date} &#8226; {post.timeToRead} min read
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-4 mt-2" />

        <Content
          className="text-base px-4 pb-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Card>

      <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
        tags
      }
      timeToRead
    }
    site {
      siteMetadata {
        disqusShortname
      }
    }

    file(relativePath: { eq: "data/images/avatar-square.png" }) {
      childImageSharp {
        resize(width: 64, toFormat: WEBP, quality: 75) {
          src
        }
      }
    }
  }
`;
