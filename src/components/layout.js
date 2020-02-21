import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Link } from "gatsby";
import AnchorLink from "react-anchor-link-smooth-scroll";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { useState, useEffect } from "react";

const drawerWidth = 200;

const styles = makeStyles(theme => ({
  navLink: {
    textDecoration: "none",
    color: "black"
  },
  flexGrow1: {
    flexGrow: 1
  },
  brand: {
    display: "inline-block"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

function HomeLinks(props) {
  const { classes, hide } = props;

  if (hide) {
    return null;
  }

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

function ShowHamburgerMenu(props) {
  const { handleDrawerOpen, hide } = props;
  if (hide) {
    return null;
  }
  return (
    <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
      <MenuIcon />
    </IconButton>
  );
}

function ShowToolbarContent(props) {
  const { classes, handleDrawerOpen, hide } = props;
  if (hide) {
    return null;
  }
  return (
    <>
      <div className={classes.flexGrow1} style={{ display: "flex" }}>
        <Typography variant="h6" color="inherit" className={classes.brand}>
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
    </>
  );
}

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = styles();
  const theme = useTheme();

  const hideNavbarItems = useWindowSize().width < 630;
  return (
    <React.Fragment>
      <div className={classes.flexGrow1}>
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar variant="dense">
            <ShowHamburgerMenu
              handleDrawerOpen={handleDrawerOpen}
              hide={!hideNavbarItems}
            />
            <ShowToolbarContent
              classes={classes}
              hide={hideNavbarItems}
              handleDrawerOpen={handleDrawerOpen}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h6" color="inherit" className={classes.brand}>
              <Link to="/" className={classes.navLink}>
                Chad Adams
              </Link>
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Home", "About", "Certifications"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text}></ListItemText>
              </ListItem>
            ))}
            <Divider />
            {[
              { name: "Blog", route: "/blog" },
              { name: "Projects", route: "/projects" }
            ].map((item) => (
              <Link to={item.route} key={item.name} style={{textDecoration: 'none', color: 'inherit'}}>
                <ListItem button key={item.name}>
                  <ListItemText primary={item.name}></ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Container maxWidth="lg">{children}</Container>
      </div>
    </React.Fragment>
  );
};
