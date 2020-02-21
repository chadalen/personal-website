import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import ReactDisqusComments from "react-disqus-comments";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  date: {
    fontSize: "16px",
    marginTop: theme.spacing(0.5)
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
    }
  }
}));

export default ({ data }) => {
  const classes = useStyles();
  const post = data.markdownRemark;
  return (
    <Layout>
      <div style={{paddingTop: '60px'}}>
      <Paper className={classes.root}>
        <div>
          <img
            style={{
              width: "64px",
              marginRight: "10px",
              position: "relative",
              borderRadius: "5%"
            }}
            src="/icons/avatar-square.png"
            alt="Avatar"
          />

          <div style={{ display: "inline-block", position: "absolute" }}>
            <Typography variant="h4">{post.frontmatter.title}</Typography>
            <Typography
              className={classes.date}
              color="textSecondary"
              gutterBottom
            >
              Chad Adams &#8226; {post.timeToRead} min read
            </Typography>
          </div>
        </div>
        <hr />
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Paper>

      <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
      }
      timeToRead
    }
    site {
      siteMetadata {
        disqusShortname
      }
    }
  }
`;
