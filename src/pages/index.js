import React from "react";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Divider, Typography, CardContent } from "@material-ui/core";

const styles = makeStyles(theme => ({
  wrapper: {
    height: "75vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  text: {
    [theme.breakpoints.up("md")]: {
      fontSize: "48px"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px"
    },
    whiteSpace: "pre"
  },
  highlight: {
    color: "#E31B6D"
  },
  avatar: {
    marginBottom: theme.spacing(1),
    maxWidth: "384px",
    borderRadius: "50%"
  },
  page: {
    width: "100%",
    height: "100%"
  },
  root: {
    width: "100%",
    height: "100vh",
  },
  textAlignCenter: {
    textAlign: "center"
  },
}));

function Intro(props) {
  const { classes } = props;
  return (
    <div className={classes.page}>
      <div className={classes.wrapper}>
        <img
          src="/icons/avatar-circle.png"
          alt="Avatar"
          className={classes.avatar}
        />
        <div className={classes.text}>
          Hello, I'm <span className={classes.highlight}>Chad Adams</span>.
        </div>
        <div className={classes.text}>I'm a full-stack web developer.</div>
      </div>
    </div>
  );
}

function AboutMe(props) {
  const { classes } = props;
  return (
    <div id="about" className={classes.page} style={{paddingTop: '85px'}}>
      <Card>
        <h2 className={classes.textAlignCenter}>About</h2>
        <Divider />
        <CardContent>
          <Typography>
            I grew up in a small town in Wisconsin called Luck. I have an
            associate's degree in Computer Programming from St Cloud Technical
            and Community College located in St Cloud, MN.
          </Typography>
          <br />
          <Typography>
            I'm a Full Stack Developer from Bismarck, ND. I develop all types of
            software, ranging from websites, mobile apps, and desktop apps.
            Coding is my passion. I enjoy writing software that helps makes
            peoples lives easier.
          </Typography>
          <br />

          <Typography>
            I was first introduced to programming at the age of 12 when I used
            to play a game called RuneScape. I was fascinated by how the game
            worked. I wanted to create my own version of the game so I worked on
            RuneScape private servers. The first programming language I used was
            Java because that was the language RuneScape was made in. I’m a big
            advocate for open-source software. I love Linux, my favorite linux
            distrobution is Ubuntu.
          </Typography>
          <br />

          <Typography>
            Throughout the years I have worked with numerous programming
            languages including: C#, Java, Kotlin, Python, JavaScript, PHP,
            Golang, Lua, Dart and TypeScript. Out of the programming languages I
            have used my favorite so far is Kotlin because I enjoy the syntax
            and the language has little to no boilerplate.
          </Typography>

          <br />

          <Typography>
            I am currently working on two projects. A mobile app for IOS and
            Android using Flutter. I am also working on an E-Commerce website in
            my spare time. In my spare time I am also studying for the AWS
            Certified Solutions Architect certification.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

function Certifications(props) {
  const { classes } = props;
  return (
    <div id="certifications" className={classes.page} style={{paddingTop: '85px'}}>
      <Card>
        <Typography
          variant="h4"
          className={classes.textAlignCenter}
        >
          Certifications
        </Typography>
        <Divider />
      </Card>
    </div>
  )
}

export default () => {
  const classes = styles();
  return (
    <Layout>
      <div className={classes.root}>
        <Intro classes={classes} />
        <AboutMe classes={classes} />
        <Certifications classes={classes} />
      </div>
    </Layout>
  );
};
