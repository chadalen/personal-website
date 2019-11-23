import React from "react";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  wrapper: {
    height: '75vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    [theme.breakpoints.up('md')]: {
      fontSize: '48px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
    },
    whiteSpace: 'pre'
  },
  highlight: {
    color: '#E31B6D'
  }
}));

export default () => {
  const classes = styles();
  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.text}>Hello, I'm <span className={classes.highlight}>Chad Adams</span>.
        </div>
        <div className={classes.text}>
          I'm a full-stack web developer.
        </div>
      </div>
    </Layout>
  );
};