import React from "react";
import Layout from "../components/layout";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
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
  const theme = useTheme();
  return (
    <section id="about" className={classes.page} style={{ paddingTop: "85px" }}>
      <div style={{ marginBottom: theme.spacing(2) }}>
        <Typography variant="h4" className={classes.textAlignCenter}>
          About Me
        </Typography>
      </div>

      <Card>
        <CardContent>
          <Typography>
            My name is Chad Adams. I'm a Full-Stack Developer from Mandan, North
            Dakota. I develop all types of software, but I primarily work with
            websites and mobile apps. Coding is my passion. I enjoy writing
            software that helps makes our lives easier. I first started to code
            around 12 years old when a friend of mine introduced me to RuneScape
            private servers.
          </Typography>
          <br />

          <Typography>
            I have an associates degree in Computer Programming from St Cloud
            Technical and Community College. I am currently pursuing a bachelors
            in Information Systems from Arizona State University.
          </Typography>
          <br />

          <Typography>
            I’m a big advocate for open-source software. I love Linux, my
            favorite linux distrobution is Ubuntu. I love reading books, writing
            blogs, working on my startup business, spending time with family and
            learning new technologies.
          </Typography>
          <br />
        </CardContent>
      </Card>

      <Certifications classes={classes} />
    </section>
  );
}

function Certifications(props) {
  const { classes } = props;

  const onClickCertification = url => {
    window.open(url, "_blank");
  };

  const theme = useTheme();
  return (
    <>
        <Typography variant="h4" className={classes.textAlignCenter} style={{marginBottom: theme.spacing(2)}}>
          Certifications
        </Typography>

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
                <img
                  src="images/mta-badge-1.png"
                  alt="mta-badge-1"
                  className={classes.badge}
                />
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
                <img
                  src="images/mta-badge-2.png"
                  alt="mta-badge-2"
                  className={classes.badge}
                />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default () => {
  const classes = styles();
  return (
    <Layout>
      <div className={classes.root}>
        <Intro classes={classes} />
        <AboutMe classes={classes} />
      </div>
    </Layout>
  );
};
