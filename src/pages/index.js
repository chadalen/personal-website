import React from "react";
import Header from "../components/header";
import { Link, graphql } from "gatsby";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import Layout from "../components/layout";

const styles = makeStyles({

})

export default ({ data }) => {
  console.log(data);
  const classes = styles()
  return (
    <Layout>
        {data.allMarkdownRemark.edges.map(({ node }, index) => (

          <Card key={index} style={{ marginBottom: '5px' }}>

            <CardContent>

              <Link
                to={node.fields.slug}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Typography variant="h4">
                  {node.frontmatter.title}
                </Typography>

              </Link>

              <small>{node.frontmatter.date}</small>

              <Typography variant="body2" color="textSecondary" component="p">
                {node.excerpt}
        </Typography>
            </CardContent>
          </Card>

        ))}
    </Layout>
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
