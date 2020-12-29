import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import Layout from '../components/layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';

export default ({ location, data }) => {
  return (
    <Layout location={location}>
      <Breadcrumb aria-label="breadcrumb" className="mb-4 mt-2">
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
      </Breadcrumb>

      {data.allMarkdownRemark.nodes.map((node, index) => (
        <GatsbyLink key={index} to={node.fields.slug}>
          <Card className="mb-4">
            <div className="flex">
              <div>
                <h1 className="text-2xl font-bold">{node.frontmatter.title}</h1>

                <div>
                  {node.frontmatter.tags &&
                    node.frontmatter.tags.map((data, index) => {
                      return (
                        <Tag key={index} className="mr-2 mb-2">
                          {data}
                        </Tag>
                      );
                    })}
                </div>

                <div className="flex items-center mb-2">
                  <img
                    src={data.file.childImageSharp.resize.src}
                    alt="Avatar"
                    className="rounded inline-block mr-2"
                  />

                  <div className="inline-block text-base">
                    <div className="font-bold">Chad Adams</div>
                    <div className="text-base text-gray-500">
                      {node.frontmatter.date} &#8226; {node.timeToRead} min read
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="mb-4 mt-2" />

            <p className="text-base mb-2">{node.excerpt}</p>

            <p className="inline-block text-base">{`${node.timeToRead} min read`}</p>
          </Card>
        </GatsbyLink>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 25
      filter: { fields: { slug: { regex: "^/blog/" } } }
    ) {
      nodes {
        fields {
          slug
        }
        timeToRead
        frontmatter {
          date(formatString: "MMM D, YYYY")
          tags
          title
        }
        excerpt
        html
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
