import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
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
  }
});

export default ({ children }) => {
  const classes = styles();
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chad Adams</title>
      </Helmet>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Chad Adams
            </Typography>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Button color="inherit">Blogs</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "5px" }} maxWidth="md">
          {children}
        </Container>
      </div>
    </React.Fragment>
  );
};
