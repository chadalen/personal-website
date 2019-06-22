import React from "react";
import Header from "../components/header";
import { Link, graphql } from "gatsby";

export default ({ data }) => {
  console.log(data);
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 600 }}>
      <Header />
      <p>Chad's Blog</p>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <Link
          to={node.fields.slug}
          style={{textDecoration: 'none',
                  color: 'inherit'}}
        >
          <div key={index}>
            <h1>{node.frontmatter.title}</h1>
            <small>{node.frontmatter.date}</small>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 25
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
          excerpt
          timeToRead
          html
        }
      }
    }
  }
`;
