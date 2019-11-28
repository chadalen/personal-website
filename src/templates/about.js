import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Breadcrumbs, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    padding: theme.spacing(1, 2)
  },
  content: {
    fontSize: "20px",
    "& img": {
      maxWidth: "100%"
    },
    "& a": {
      color: "#337ab7",
      textDecoration: "none",
      "&:hover": {
        color: "#23527c",
        textDecoration: "underline"
      }
    },
    "& h1": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    "& h2": {
      marginBottom: "0px"
    },
    "& p": {
      marginTop: "0px"
    }
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
  const classes = useStyles();
  const post = data.markdownRemark;
  return (
    <Layout>
      <div className={classes.root}>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "20px" }}>
          <GatsbyLink className={classes.breadCrumbLink} to={"/"}>
            Home
          </GatsbyLink>
          <Typography color="textPrimary">About</Typography>
        </Breadcrumbs>

        <Typography
          variant="h3"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          About
        </Typography>
        <Divider />

        <Paper className={classes.contentWrapper}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Paper>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
    }
  }
`;
