const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `data` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve(`./src/templates/blog.js`);
  const projectTemplate = path.resolve(`./src/templates/project.js`);
  const aboutTemplate = path.resolve(`./src/templates/about.js`);

  let result = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/^/blog/" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const blogs = result.data.allMarkdownRemark.edges;
  blogs.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        slug: node.fields.slug
      }
    });
  });

  result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "/^/projects/" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);

  const projects = result.data.allMarkdownRemark.edges;
  projects.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: projectTemplate,
      context: {
        slug: node.fields.slug
      }
    });
  });

  result = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/^/about/" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const about = result.data.allMarkdownRemark.edges;
  about.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: aboutTemplate,
      context: {
        slug: node.fields.slug
      }
    });
  });
};
