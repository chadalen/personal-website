import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button
} from "@material-ui/core";
import { Link } from "gatsby";
import AnchorLink from "react-anchor-link-smooth-scroll";

const styles = makeStyles({
  navLink: {
    textDecoration: "none",
    color: "black"
  },
  flexGrow1: {
    flexGrow: 1
  },
  brand: {
    display: "inline-block"
  }
});

function HomeLinks(props) {
  const { classes } = props;
  const url = window.location.pathname;
  console.log("url", url);

  if (url === "/") {
    return (
      <>
        <AnchorLink href="#intro" className={classes.navLink}>
          <Button color="inherit">Home</Button>
        </AnchorLink>

        <AnchorLink href="#about" className={classes.navLink}>
          <Button color="inherit">About</Button>
        </AnchorLink>

        <AnchorLink href="#certifications" className={classes.navLink}>
          <Button color="inherit">Certifications</Button>
        </AnchorLink>
      </>
    );
  }

  return (
    <>
      <Link to="#intro" className={classes.navLink}>
        <Button color="inherit">Home</Button>
      </Link>

      <Link to="#about" className={classes.navLink}>
        <Button color="inherit">About</Button>
      </Link>

      <Link to="#certifications" className={classes.navLink}>
        <Button color="inherit">Certifications</Button>
      </Link>
    </>
  );
}

export default ({ children }) => {
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.flexGrow1}>
        <AppBar position="fixed" color="default">
          <Toolbar variant="dense">
            <div className={classes.flexGrow1} style={{ display: "flex" }}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.brand}
              >
                <Link to="/" className={classes.navLink}>
                  Chad Adams
                </Link>
              </Typography>

              <HomeLinks classes={classes} />
            </div>
            <Link to="/blog" className={classes.navLink}>
              <Button color="inherit">Blog</Button>
            </Link>
            <Link to="/projects" className={classes.navLink}>
              <Button color="inherit">Projects</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">{children}</Container>
      </div>
    </React.Fragment>
  );
};
