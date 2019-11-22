import React from "react";
import { Link, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import Layout from "../components/layout";

const styles = makeStyles({
  date: {
    fontSize: "16px"
  },
  summary: {
    fontSize: "20px"
  },
  link: {
    color: '#337ab7',
    textDecoration: 'none',
    '&:hover': {
      color: '#23527c',
      textDecoration: 'underline'
    }
  }
});

export default ({ data }) => {
  console.log(data);
  const classes = styles();
  return (
    <Layout>
      <Typography variant="h3" style={{marginTop: '20px', marginBottom: '20px'}}>Blog</Typography>
      <Divider />
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <React.Fragment>
          <div style={{padding: '20px'}}>
          <Link
            to={node.fields.slug}
            className={classes.link}
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

          <Typography
            className={classes.summary}
            component="p"
          >
            {node.excerpt}
          </Typography>

          <Link
          to={node.fields.slug}
          className={classes.link}>
          <Typography component="p">Read More...</Typography>
          </Link>
          </div>
        </React.Fragment>
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
