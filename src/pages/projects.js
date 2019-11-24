import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography, Breadcrumbs, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Layout from "../components/layout";
import Button from "@material-ui/core/Button";

const styles = makeStyles(theme => ({
  date: {
    fontSize: "16px"
  },
  summary: {
    fontSize: "20px"
  },
  blogTitleLink: {
    color: "#337ab7",
    textDecoration: "none",
    "&:hover": {
      color: "#23527c",
      textDecoration: "underline"
    }
  },
  blogTitle: {
    marginBottom: theme.spacing(0.5)
  },
  linkButton: {
    textDecoration: "none"
  },
  breadCrumbLink: {
    color: "rgba(0, 0, 0, 0.54)",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export default ({ data }) => {
  console.log(data);
  const classes = styles();
  return (
    <Layout>
      <Paper
        elevation={0}
        className={classes.paper}
        style={{ marginTop: "20px" }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <GatsbyLink className={classes.breadCrumbLink} href="/">
            Home
          </GatsbyLink>
          <Typography color="textPrimary">Projects</Typography>
        </Breadcrumbs>
      </Paper>

      <Typography
        variant="h3"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Projects
      </Typography>
      <Divider />
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <React.Fragment>
          <Card style={{ marginBottom: "20px" }}>
            <CardContent>
              <div>
                <GatsbyLink
                  to={node.fields.slug}
                  className={classes.blogTitleLink}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    className={classes.blogTitle}
                    gutterBottom
                  >
                    {node.frontmatter.title}
                  </Typography>
                </GatsbyLink>
              </div>
              <hr />

              <Typography component="p">{node.frontmatter.description}</Typography>
            </CardContent>
            <CardActions>
              <GatsbyLink to={node.fields.slug} className={classes.linkButton}>
                <Button size="small">Read More</Button>
              </GatsbyLink>

              <Typography className={classes.date} color="textSecondary">
                {`${node.timeToRead} min read`}
              </Typography>
            </CardActions>
          </Card>
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
      filter: { fields: { slug: { regex: "/^/projects/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM D, YYYY")
            title
            description
          }
          excerpt
          timeToRead
          html
        }
      }
    }
  }
`;
