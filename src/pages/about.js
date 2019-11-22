import React from "react";
import Layout from "../components/layout";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";

const styles = makeStyles({
  date: {
    fontSize: "16px"
  },
  summary: {
    fontSize: "20px"
  },
  iconLink: {
    color: "black"
  }
});

export default () => {
  const classes = styles();
  return (
    <Layout>
      <div style={{paddingTop: '20px'}}>
      <Typography variant="h4">About Me</Typography>
      <Typography
        className={classes.summary}
        component="p"
        style={{ marginBottom: "2.5rem" }}
      >
        Hi, I'm Chad Adams. I'm a Software Developer from Bismarck, ND. I have a
        keen interest in website and mobile development. I code all day.
        Everyday. I love to code. Coding is my passion. I enjoy constantly
        learning new technologies and teaching others what I have learned. I
        love and support open source software. I went to college at St Cloud
        Technical and Community College in St Cloud, MN. I'm also a certified Microsoft developer. I currently work at{" "}
        <a
          href="https://www.nisc.coop/"
          target="_blank"
          rel="noopener noreferrer"
        >NISC</a>{" "}
        a Software Company here in North Dakota.
      </Typography>

      <Typography
        className={classes.summary}
        component="p"
        style={{ marginBottom: "2.5rem" }}
      >
        For more info about me please see my public profiles on:
      </Typography>

      <a
        title="GitHub"
        href="https://github.com/chadalen"
        target="_blank"
        className={classes.iconLink}
        style={{ marginRight: "5px" }}
        rel="noopener noreferrer"
      >
        <GitHub fontSize="large" />
      </a>

      <a
        title="LinkedIn"
        href="https://linkedin.com/in/chadalen"
        target="_blank"
        className={classes.iconLink}
        rel="noopener noreferrer"
      >
        <LinkedIn fontSize="large" />
      </a>
      </div>
    </Layout>
  );
};
