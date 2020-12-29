import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';
import ReactDisqusComments from 'react-disqus-comments';
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

export default ({ location, data }) => {
  const post = data.markdownRemark;
  return (
    <Layout location={location}>
      <Breadcrumb aria-label="breadcrumb" className="mb-4 mt-2">
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>
        <Breadcrumb.Item to={'/projects'}>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>{post.frontmatter.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-4">
        <div className="flex">
          <div>
            <h1 className="text-2xl font-bold">{post.frontmatter.title}</h1>

            {post.frontmatter.tags &&
              post.frontmatter.tags.map((data, index) => {
                return (
                  <Tag key={index} className="mr-2 mb-2">
                    {data}
                  </Tag>
                );
              })}
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
