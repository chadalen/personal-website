import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
// import ReactDisqusComments from 'react-disqus-comments';
import Layout from '../../components/ContentLayout';
import Tag from '../../components/Tag';
import { getAllProjects, getProjectBySlug } from '../../../lib/api';
import { markdownToHtml } from '../../util';
// import settings from '../../settings';

export default function Page({ project }) {
  return (
    <>
      <Head>
        <title>{`Chad Alen - ${project.title}`}</title>
        <meta name="Description" content="A project created by Chad Alen." />
        <link
          rel="preload"
          href="https://unpkg.com/prism-themes@1.5.0/themes/prism-darcula.css"
          as="script"
        />

        <link
          href="https://unpkg.com/prism-themes@1.5.0/themes/prism-darcula.css"
          rel="stylesheet"
        />
      </Head>

      <Layout>
        <article className="prose lg:prose-xl px-8 m-auto my-16">
          <div className="flex">
            <div>
              <h1 className="text-5xl font-bold mb-4" style={{ marginBottom: '1rem' }}>{project.title}</h1>

              <div className="mb-2">
                {project.tags
                && project.tags.map((tag) => (
                  <Tag key={tag} className="mr-2 mb-2 p-1" value={tag} />
                ))}
              </div>
            </div>
          </div>

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </article>

        {/* <ReactDisqusComments
          shortname={settings.disqusShortname}
          identifier={project.slug}
          title={project.title}
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
    slug: PropTypes.string.isRequired,
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
