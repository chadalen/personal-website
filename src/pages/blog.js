import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography, Breadcrumbs, Paper } from "@material-ui/core";
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
  },
  breadCrumbLink: {
    color: 'rgba(0, 0, 0, 0.54)',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

export default ({ data }) => {
  console.log(data);
  const classes = styles();
  return (
    <Layout>

      <Paper elevation={0} className={classes.paper} style={{marginTop: '20px'}}>
        <Breadcrumbs aria-label="breadcrumb">
          <GatsbyLink className={classes.breadCrumbLink} href="/">
            Home
          </GatsbyLink>
          <Typography color="textPrimary">Blog</Typography>
        </Breadcrumbs>
      </Paper>

      <Typography variant="h3" style={{marginTop: '20px', marginBottom: '20px'}}>Blog</Typography>
      <Divider />
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <React.Fragment>
          <div style={{padding: '20px'}}>
          <GatsbyLink
            to={node.fields.slug}
            className={classes.link}
          >
            <Typography variant="h4">{node.frontmatter.title}</Typography>
          </GatsbyLink>

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

          <GatsbyLink
          to={node.fields.slug}
          className={classes.link}>
          <Typography component="p">Read More...</Typography>
          </GatsbyLink>
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
