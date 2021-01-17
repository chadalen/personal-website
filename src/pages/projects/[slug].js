import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import Layout from '../../components/layout';
import Card from '../../components/Card';
import Tag from '../../components/Tag';
import Breadcrumb from '../../components/Breadcrumb';
import { getAllProjects, getProjectBySlug } from '../../../lib/api';
import { markdownToHtml } from '../../util';
import Markdown from '../../components/Markdown';
hljs.registerLanguage('javascript', javascript);
// import ReactDisqusComments from 'react-disqus-comments';

export default function Page({ project }) {
  
  useEffect(() => {
    hljs.initHighlighting();
  }, [])

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

            <div className="mb-2">
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
        </div>

        <hr className="mb-4 mt-2" />

        <Markdown htmlContent={project.content} />

      </Card>

      {/* <ReactDisqusComments
        shortname={data.site.siteMetadata.disqusShortname}
        identifier={post.id}
        title={post.frontmatter.title}
      /> */}
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
