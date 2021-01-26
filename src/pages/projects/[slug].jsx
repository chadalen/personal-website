import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import Layout from '../../components/Layout';
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
  }, []);

  return (
    <>
      <Head>
        <title>{`Chad Alen - ${project.title}`}</title>
        <meta name="Description" content="A project created by Chad Alen." />
      </Head>

      <Layout>
        <Breadcrumb className="mb-4 mt-2">
          <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item to="/projects">Projects</Breadcrumb.Item>
          <Breadcrumb.Item>{project.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <div className="flex">
            <div>
              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>

              <div className="mb-2">
                {project.tags
                  && project.tags.map((tag) => (
                    <Tag key={tag} className="mr-2 mb-2" value={tag} />
                  ))}
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
    </>
  );
}

Page.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug, [
    'title',
    'tags',
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
    paths: projects.map((project) => ({
      params: {
        slug: project.slug,
      },
    })),
    fallback: false,
  };
}
