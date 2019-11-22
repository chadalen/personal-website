import React from "react";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  wrapper: {
    height: '75vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    fontSize: '32pt',
    lineHeight: '36pt',
    whiteSpace: 'pre'
  },
  highlight: {
    color: '#E31B6D'
  }
});

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