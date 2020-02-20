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

const styles = makeStyles({
  navLink: {
    textDecoration: "none",
    color: "black",
  },
  flexGrow1: {
    flexGrow: 1
  },
  brand: {
    display: 'inline-block'
  }
});

export default ({ children }) => {
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.flexGrow1}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <div className={classes.flexGrow1}>
              <Typography variant="h6" color="inherit" className={classes.brand}>
                <Link to="/" className={classes.navLink}>
                  Chad Adams
                </Link>
              </Typography>

            <Link to="/" className={classes.navLink}>
              <Button color="inherit">Home</Button>
            </Link>

            <Link to="#about" className={classes.navLink}>
              <Button color="inherit">About</Button>
            </Link>

            <Link to="#certifications" className={classes.navLink}>
              <Button color="inherit">Certifications</Button>
            </Link>
            </div>
            <Link to="/blog" className={classes.navLink}>
              <Button color="inherit">Blog</Button>
            </Link>
            <Link to="/projects" className={classes.navLink}>
              <Button color="inherit">Projects</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "85px" }} maxWidth="lg">
          {children}
        </Container>
      </div>
    </React.Fragment>
  );
};
