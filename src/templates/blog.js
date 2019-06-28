import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  date: {
    fontSize: 14
  },
  content: {
    "& img": {
      maxWidth: "100%"
    }
  }
}));


export default ({ data }) => {
  console.log(data)
  const classes = useStyles();
  const post = data.markdownRemark
  return (
    <Layout>
      <Paper className={classes.root}>
        <Typography variant="h4">
          {post.frontmatter.title}
        </Typography>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {post.frontmatter.date}
        </Typography>
        <hr />
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.html }} />
      </Paper>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`