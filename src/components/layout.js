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
    color: "black",
  },
  title: {
    flexGrow: 1
  }
});

export default ({ children }) => {
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
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
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "85px" }} maxWidth="lg">
          {children}
        </Container>
      </div>
    </React.Fragment>
  );
};
