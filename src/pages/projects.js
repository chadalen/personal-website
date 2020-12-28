import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import Layout from '../components/layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';

function ProjectCardList({ title, data }) {
  const sortedData = data.sort((a, b) => {
    return b.node.frontmatter.sort - a.node.frontmatter.sort;
  });
  return (
    <>
      <h1 className="mb-2 text-2xl">{title}</h1>

      {sortedData.map(({ node }, index) => (
        <GatsbyLink key={index} to={node.fields.slug}>
          <Card className="mb-4">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="flex-1">
                <div className="flex items-center justify-start h-full px-4">
                  <div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {node.frontmatter.title}
                      </h1>
                    </div>

                    <hr className="my-4" />

                    <p className="mb-2 text-base">
                      {node.frontmatter.description}
                    </p>

                    {node.frontmatter.tags.map((data, index) => {
                      return (
                        <Tag key={index} className="mr-2 mb-2">
                          {data}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex-1 mb-2 md:mb-0">
                {node.frontmatter.previewImage ? (
                  <img
                    src={node.frontmatter.previewImage}
                    alt="preview"
                    style={{
                      maxHeight: '256px',
                    }}
                  />
                ) : null}
              </div>
            </div>
          </Card>
        </GatsbyLink>
      ))}
    </>
  );
}

export default ({ data }) => {
  const freelanceProjects = data.allMarkdownRemark.edges.filter(
    (item) => item.node.frontmatter.freelance
  );
  const personalProjects = data.allMarkdownRemark.edges.filter(
    (item) => !item.node.frontmatter.freelance
  );
  return (
    <Layout>
      <Breadcrumb className='mb-4 mt-2'>
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>

        <Breadcrumb.Item>Projects</Breadcrumb.Item>
      </Breadcrumb>

      <ProjectCardList title="Freelance Projects" data={freelanceProjects} />
      <ProjectCardList title="Personal Projects" data={personalProjects} />
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
          html
        }
      }
    }
  }
`;
