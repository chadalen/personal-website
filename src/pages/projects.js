import React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography, Breadcrumbs } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Layout from "../components/layout";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles((theme) => ({
  date: {
    fontSize: "16px",
  },
  summary: {
    fontSize: "20px",
  },
  blogTitleLink: {
    color: "#337ab7",
    textDecoration: "none",
    "&:hover": {
      color: "#23527c",
      textDecoration: "underline",
    },
  },
  blogTitle: {
    marginBottom: theme.spacing(0.5),
  },
  linkButton: {
    textDecoration: "none",
  },
  breadCrumbLink: {
    color: "rgba(0, 0, 0, 0.54)",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  cardContentWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  preview: {
    display: "flex",
    alignItems: "center",
    "& img": {
      maxWidth: "512px",
      maxHeight: "384px",
    },
  },
}));

function ProjectCardList({ title, classes, data }) {
  const sortedData = data.sort((a, b) => {
    return b.node.frontmatter.sort - a.node.frontmatter.sort;
  });
  return (
    <>
      <Typography
        variant="h3"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {title}
      </Typography>
      <Divider />
      {sortedData.map(({ node }, index) => (
        <div key={index}>
          <Card style={{ marginBottom: "20px" }}>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <div className={classes.cardContentWrapper}>
                    <div>
                      <div>
                        <GatsbyLink
                          to={node.fields.slug}
                          className={classes.blogTitleLink}
                        >
                          <Typography
                            variant="h4"
                            component="h2"
                            className={classes.blogTitle}
                            gutterBottom
                          >
                            {node.frontmatter.title}
                          </Typography>
                        </GatsbyLink>
                      </div>
                      <hr />

                      <Typography component="p">
                        {node.frontmatter.description}
                      </Typography>

                      <div>
                        {node.frontmatter.tags.map((data, index) => {
                          return (
                            <Chip
                              key={index}
                              label={data}
                              className={classes.chip}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item md={6}>
                  <div className={classes.preview}>
                    {node.frontmatter.previewImage ? (
                      <img src={node.frontmatter.previewImage} alt="preview" />
                    ) : null}
                  </div>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <GatsbyLink to={node.fields.slug} className={classes.linkButton}>
                <Button size="small" aria-label="Read More">
                  Read More
                </Button>
              </GatsbyLink>

              <Typography className={classes.date} color="textSecondary">
                {`${node.timeToRead} min read`}
              </Typography>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  );
}

export default ({ data }) => {
  const classes = styles();
  const freelanceProjects = data.allMarkdownRemark.edges.filter(
    (item) => item.node.frontmatter.freelance
  );
  const personalProjects = data.allMarkdownRemark.edges.filter(
    (item) => !item.node.frontmatter.freelance
  );
  return (
    <Layout>
      <div style={{ paddingTop: "50px" }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "20px" }}>
          <GatsbyLink className={classes.breadCrumbLink} to={"/"}>
            Home
          </GatsbyLink>
          <Typography color="textPrimary">Projects</Typography>
        </Breadcrumbs>

        <ProjectCardList
          title="Freelance Projects"
          classes={classes}
          data={freelanceProjects}
        />
        <ProjectCardList
          title="Personal Projects"
          classes={classes}
          data={personalProjects}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title] }
      limit: 25
      filter: { fields: { slug: { regex: "/^/projects/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM D, YYYY")
            title
            description
            tags
            previewImage
            freelance
            sort
          }
          excerpt
          timeToRead
          html
        }
      }
    }
  }
`;
