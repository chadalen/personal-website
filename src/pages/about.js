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
    color: 'black'
  }
});

export default () => {
  const classes = styles();
  return (
    <Layout>
      <Typography variant="h4">About Me</Typography>
      <Typography
        className={classes.summary}
        component="p"
        style={{ marginBottom: "2.5rem" }}
      >
        Hi, I'm Chad Adams. I'm a Software Developer with a keen interest in
        website and mobile development. My hobbies are... Coding, coding and
        coding. No really.. I love to code. I'm always trying out the latest
        technologies and learning something new. I'm originally from Wisconsin.
        I went to college at St Cloud Technical and Community College in St
        Cloud, MN. I'm also a certified Microsoft developer. I currently work at{" "}
        <a href="https://www.nisc.coop/" target="_blank" rel="noopener noreferrer">
          NISC
        </a>{" "}
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
        style={{ marginRight: '5px' }}
        rel="noopener noreferrer"
      >
        <GitHub />
      </a>

      <a 
        title="LinkedIn"
        href="https://linkedin.com/in/chadalen"
        target="_blank"
        className={classes.iconLink}
        rel="noopener noreferrer"
      >
        <LinkedIn />
      </a>
    </Layout>
  );
};
