import React from "react";
import { Link, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import Layout from "../components/layout";

const styles = makeStyles({
  date: {
    fontSize: '16px'
  },
  summary: {
    fontSize: '20px'
  }
});

export default ({ data }) => {
  console.log(data);
  const classes = styles();
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <Card key={index} style={{ marginBottom: "5px" }}>
          <CardContent>
            <div>
              <img
                style={{ width: "64px", position: "relative", marginRight: "10px" }}
                src="./avatar.png"
                alt="Avatar"
              />

              <div style={{display: "inline-block", position: "absolute"}}>
              <Link
                to={node.fields.slug}
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}
              >
                <Typography variant="h4">{node.frontmatter.title}</Typography>
              </Link>
              <Typography
                  className={classes.date}
                  color="textSecondary"
                  gutterBottom
                >
                  {node.frontmatter.date}
                </Typography>
              </div>
            </div>

            <Typography className={classes.summary} color="textSecondary" component="p">
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
            date(formatString: "MMM D, YYYY")
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
