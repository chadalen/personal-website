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
  root: {
    flexGrow: 1
  },
  navLink: {
    textDecoration: "none",
    color: "black"
  }
});

export default ({ children }) => {
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              <Link to="/" className={classes.navLink}>
                Chad Adams
              </Link>
            </Typography>
            <Link to="/blog" className={classes.navLink}>
              <Button color="inherit">Blog</Button>
            </Link>
            <Link to="/projects" className={classes.navLink}>
              <Button color="inherit">Projects</Button>
            </Link>
            <Link to="/about" className={classes.navLink}>
              <Button color="inherit">About</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "5px", height: '100vh' }} maxWidth="lg">
          {children}
        </Container>
      </div>
    </React.Fragment>
  );
};
