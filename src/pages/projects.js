import React from "react";
import Layout from "../components/layout";
import { Link as GatsbyLink } from "gatsby";
import { Typography, Breadcrumbs, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  breadCrumbLink: {
    color: 'rgba(0, 0, 0, 0.54)',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

export default () => {
  const classes = styles();
  return (
    <Layout>
      <Paper elevation={0} className={classes.paper} style={{marginTop: '20px'}}>
        <Breadcrumbs aria-label="breadcrumb">
          <GatsbyLink className={classes.breadCrumbLink} href="/">
            Home
          </GatsbyLink>
          <Typography color="textPrimary">Projects</Typography>
        </Breadcrumbs>
      </Paper>
      <p>Will add soon...</p>
    </Layout>
  );
};