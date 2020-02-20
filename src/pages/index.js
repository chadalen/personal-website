import React from "react";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  Divider,
  Typography,
  CardContent,
  CardActionArea
} from "@material-ui/core";

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
    height: "100vh"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  badge: {
    maxWidth: "192px",
    maxHeight: "192px"
  }
}));

function Intro(props) {
  const { classes } = props;
  return (
    <section id="intro" className={classes.page} style={{ paddingTop: "85px" }}>
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
    </section>
  );
}

function AboutMe(props) {
  const { classes } = props;
  return (
    <section id="about" className={classes.page} style={{ paddingTop: "85px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Typography variant="h4" className={classes.textAlignCenter}>
          About Me
        </Typography>

        <Divider />
      </div>

      <Card>
        <CardContent>
          <Typography>
            My name is Chad Adams. I'm a Full-Stack Developer from Mandan, North
            Dakota. I specialize in working on websites, mobile apps and desktop
            applications. Coding is my passion. I enjoy writing software that
            helps makes our lives easier.
          </Typography>
          <br />
          <Typography>
            I first started programming when I was 12 years old. I played a game
            called "RuneScape" and a friend introduced me to RuneScape private
            servers. From there I spent most of my time working on tools for the
            community.
          </Typography>
          <br />

          <Typography>
            I have an associates degree in Computer Programming from St Cloud
            Technical and Community College. I love to code, but I also love to
            be an entrepreneur. So I am currently pursuing a bachelor in
            Information Systems from Arizona State University.
          </Typography>
          <br />

          <Typography>
            I’m a big advocate for open-source software. I love Linux, my
            favorite linux distrobution is Ubuntu.
          </Typography>
          <br />

          <Typography>
            Throughout the years I have worked with numerous programming
            languages including: C#, Java, Kotlin, Python, JavaScript, PHP,
            Golang, Lua, Dart and TypeScript. Out of the programming languages I
            have used my favorite so far is Kotlin because I enjoy the syntax.
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
    </section>
  );
}

function Certifications(props) {
  const { classes } = props;

  const onClickCertification = url => {
    window.open(url, "_blank");
  };

  return (
    <section
      id="certifications"
      className={classes.page}
      style={{ paddingTop: "85px" }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Typography variant="h4" className={classes.textAlignCenter}>
          Certifications
        </Typography>

        <Divider />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Card
          style={{ display: "inline-block", marginRight: "16px" }}
          onClick={() =>
            onClickCertification(
              "https://www.microsoft.com/en-us/learning/exam-98-361.aspx"
            )
          }
        >
          <CardActionArea>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img src="images/mta-badge-1.png" className={classes.badge} />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          style={{ display: "inline-block" }}
          onClick={() =>
            onClickCertification(
              "https://www.microsoft.com/en-us/learning/exam-98-388.aspx"
            )
          }
        >
          <CardActionArea>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img src="images/mta-badge-2.png" className={classes.badge} />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </section>
  );
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
