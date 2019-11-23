import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography, Breadcrumbs, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Layout from "../components/layout";
import Button from "@material-ui/core/Button";

const styles = makeStyles({
  date: {
    fontSize: "16px"
  },
  summary: {
    fontSize: "20px"
  },
  link: {
    color: "#337ab7",
    textDecoration: "none",
    "&:hover": {
      color: "#23527c",
      textDecoration: "underline"
    }
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
});

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
          <Typography color="textPrimary">Blog</Typography>
        </Breadcrumbs>
      </Paper>

      <Typography
        variant="h3"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Blog
      </Typography>
      <Divider />
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <React.Fragment>
          <Card style={{ marginBottom: "20px" }}>
            <CardContent>
              <div style={{display: 'flex'}}>
              <div>
                <img src="/icons/icon-256x256.png" alt="Avatar" style={{width: '64px', marginRight: '10px'}} />
              </div>
                <div>
                <GatsbyLink to={node.fields.slug} className={classes.link}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {node.frontmatter.title}
                  </Typography>
                </GatsbyLink>
  
                <Typography
                  className={classes.date}
                  color="textSecondary"
                  gutterBottom
                >
                  Chad Adams &#8226; {node.frontmatter.date}
                </Typography>
                </div>
              </div>
              <hr />

              <Typography component="p">{node.excerpt}</Typography>
            </CardContent>
            <CardActions>
              <GatsbyLink to={node.fields.slug} className={classes.linkButton}>
                <Button size="small">Read More</Button>
              </GatsbyLink>
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
