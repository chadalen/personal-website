import React from "react";
import Layout from "../components/layout";
import { Typography, Breadcrumbs, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
import { Link as GatsbyLink } from "gatsby";

const styles = makeStyles({
  date: {
    fontSize: "16px"
  },
  summary: {
    fontSize: "20px"
  },
  iconLink: {
    color: "black"
  },
  breadCrumbLink: {
    color: "rgba(0, 0, 0, 0.54)",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  link: {
    color: "#337ab7",
    textDecoration: "none",
    "&:hover": {
      color: "#23527c",
      textDecoration: "underline"
    }
  }
});

export default () => {
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
          <Typography color="textPrimary">About</Typography>
        </Breadcrumbs>
      </Paper>

      <div style={{ paddingTop: "20px" }}>
        <Typography variant="h4">About Me</Typography>
        <hr />
        <Typography
          className={classes.summary}
          component="p"
          style={{ marginBottom: "2.5rem" }}
        >
          I'm a Software Developer from Bismarck, ND. I develop all types of
          software, ranging from websites, to mobile apps, to desktop apps.
          Coding is my passion. I enjoy writing software that helps makes
          peoples lives easier.
          <br />
          <br />
          I grew up in a small town in Wisconsin called Luck. I have an
          associate's degree in Computer Programming at St Cloud Technical and
          Community College in St Cloud, MN.
          <br />
          <br />
          I'm a certified Microsoft developer. After college I worked at
          ColdSpring Granite Company as a Software developer in ColdSpring, MN.
          I was there for over a year in which we primarily worked with the
          Microsoft stack. (C#, ASP.NET, SQL Server). After ColdSpring I
          consulted with them for a few months then worked at my current job at{" "}
          <a
            href="https://www.nisc.coop/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            NISC
          </a>{" "}
          as a Software Associate in Mandan, ND.
        </Typography>

        <Typography
          variant="h5"
          style={{ marginBottom: "10px", fontWeight: "bold" }}
        >
          Social Networks
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

        <Typography
          variant="h5"
          style={{ marginTop: "10px", fontWeight: "bold" }}
        >
          Contact me
        </Typography>

        <Typography
          component="b"
          style={{ marginTop: "10px", fontWeight: "bold", whiteSpace: 'pre' }}
        >
          Email:&nbsp;
          </Typography>

        <Typography
          className={classes.summary}
          component="p"
          style={{ marginBottom: "2.5rem", display: 'inline-block' }}
        >
          me@chadalen.com
        </Typography>
      </div>
    </Layout>
  );
};
