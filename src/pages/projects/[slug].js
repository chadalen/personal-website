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
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>

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
          className="markdown text-base px-4 pb-4"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </Card>

      {/* <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      /> */}

      <style global jsx>
        {`
          .markdown {
            h2 {
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-weight: bold;
              font-size: 2.25rem;
              line-height: 2.5rem;
            }

            h3 {
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-weight: bold;
              font-size: 1.875rem;
              line-height: 2.25rem;
            }

            p {
              margin-top: 1rem;
              margin-bottom: 1rem;

              font-size: 1.25rem;
              line-height: 1.75rem;
            }

            ul {
              padding-left: 1.5rem;
              li {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
                list-style-type: disc;
              }
            }

            ol {
              padding-left: 1.5rem;
              li {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
                list-style-type: decimal;
                ::marker {
                  font-weight: 600;
                }
              }
            }

            a {
              color: rgb(51, 122, 183);
              text-decoration-color: rgb(51, 122, 183);
            }

            a:hover {
              color: #23527c;
              text-decoration: underline;
            }

            img {
              border-radius: 0.25rem;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }

          }
        `}
      </style>
    </Layout>
  );
}

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
