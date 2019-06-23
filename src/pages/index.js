import React from "react";
import { Link, graphql } from "gatsby";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";
import Layout from "../components/layout";

const styles = makeStyles({
  date: {
    fontSize: 14
  }
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

              <Typography className={classes.date} color="textSecondary" gutterBottom>
              {node.frontmatter.date}
              </Typography>

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
