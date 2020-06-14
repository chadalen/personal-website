import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography, Breadcrumbs } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Layout from "../components/layout";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

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
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default ({ data }) => {
  const classes = styles();
  return (
    <Layout>
      <div style={{paddingTop: '50px'}}>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "20px" }}>
        <GatsbyLink className={classes.breadCrumbLink} to={"/"}>
          Home
        </GatsbyLink>
        <Typography color="textPrimary">Projects</Typography>
      </Breadcrumbs>

      <Typography
        variant="h3"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Projects
      </Typography>
      <Divider />
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <div key={index}>
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

              <Typography component="p">
                {node.frontmatter.description}
              </Typography>

              <div>
                {node.frontmatter.tags.map((data, index) => {
                  return (
                    <Chip key={index} label={data} className={classes.chip} />
                  );
                })}
              </div>
            </CardContent>
            <CardActions>
              <GatsbyLink to={node.fields.slug} className={classes.linkButton}>
                <Button size="small" aria-label="Read More">Read More</Button>
              </GatsbyLink>

              <Typography className={classes.date} color="textSecondary">
                {`${node.timeToRead} min read`}
              </Typography>
            </CardActions>
          </Card>
        </div>
      ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title] }
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
            tags
          }
          excerpt
          timeToRead
          html
        }
      }
    }
  }
`;
