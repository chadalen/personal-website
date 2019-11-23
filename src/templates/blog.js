import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  date: {
    fontSize: '16px'
  },
  content: {
    fontSize: '20px',
    "& img": {
      maxWidth: "100%"
    },
    "& a": {
      color: '#337ab7',
      textDecoration: 'none',
      '&:hover': {
        color: '#23527c',
        textDecoration: 'underline'
      }
    }
  },
}));

export default ({ data }) => {
  console.log(data);
  const classes = useStyles();
  const post = data.markdownRemark;
  return (
    <Layout>

      <Paper className={classes.root}>
        <div>
        <img
          style={{ width: "64px", marginRight: "10px", position: "relative" }}
          src="/icons/icon-256x256.png"
          alt="Avatar"
        />

        <div style={{display: "inline-block", position: "absolute"}}>
        <Typography variant="h4">{post.frontmatter.title}</Typography>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {post.frontmatter.date}
        </Typography>
        </div>

          </div>
        <hr />
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Paper>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
      }
    }
  }
`;
