import React from 'react';
import Layout from '../../components/layout';
import Card from '../../components/Card';
import Tag from '../../components/Tag';
import Breadcrumb from '../../components/Breadcrumb';
import { getAllProjects, getProjectBySlug } from '../../../lib/api';
import { markdownToHtml } from '../../util';
// import ReactDisqusComments from 'react-disqus-comments';
// import styled from 'styled-components';

// const Content = styled.div`
//   h1 {
//     font-size: 2.25rem;
//     line-height: 2.5rem;
//     font-weight: bold;
//   }

//   h2 {
//     font-size: 1.875rem;
//     line-height: 2.25rem;
//     font-weight: bold;
//   }

//   h3 {
//     font-size: 1.5rem;
//     line-height: 2rem;
//     font-weight: bold;
//   }

//   li {
//     list-style-type: disc;
//   }
// `;

export default function Page({ project }) {
  return (
    <Layout>
      <Breadcrumb aria-label="breadcrumb" className="mb-4 mt-2">
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>
        <Breadcrumb.Item to={'/projects'}>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>{project.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mb-4">
        <div className="flex">
          <div>
            <h1 className="text-2xl font-bold">{project.title}</h1>

            {project.tags &&
              project.tags.map((tag, index) => {
                return (
                  <Tag key={index} className="mr-2 mb-2">
                    {tag}
                  </Tag>
                );
              })}
          </div>
        </div>

        <hr className="mb-4 mt-2" />

        <div
          className="text-base px-4 pb-4"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </Card>

      {/* <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      /> */}
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug, [
    'title',
    'date',
    'tags',
    'excerpt',
    'timeToRead',
    'ago',
    'slug',
    'content',
  ]);

  const content = await markdownToHtml(project.content);

  return {
    props: {
      project: {
        ...project,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = getAllProjects(['slug']);

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      };
    }),
    fallback: false,
  };
}

