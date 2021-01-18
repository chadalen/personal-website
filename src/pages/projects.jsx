import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';
import { getAllProjects } from '../../lib/api';

const ProjectCard = ({ project }) => (
  <Card className="mb-4">
    <div className="flex flex-col-reverse md:flex-row">
      <div className="flex-1">
        <div className="flex items-center justify-start h-full px-4">
          <div>
            <div>
              <h1 className="text-2xl font-bold">{project.title}</h1>
            </div>

            <hr className="my-4" />

            <p className="mb-2 text-base">{project.description}</p>

            {project.tags.map((tag) => (
              <Tag key={tag} className="mr-2 mb-2">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 mb-2 md:mb-0">
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt="preview"
            style={{
              maxHeight: '256px',
            }}
          />
        ) : null}
      </div>
    </div>
  </Card>
);

const ProjectLink = React.forwardRef(({ href, onClick, project }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <ProjectCard project={project} />
  </a>
));

ProjectLink.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
};

ProjectLink.defaultProps = {
  href: '',
  onClick: () => { },
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Page({ projects }) {
  return (
    <Layout>
      <Breadcrumb className="mb-4 mt-2">
        <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
      </Breadcrumb>

      {projects.map((project) => (
        <Link key={project.title} href={`/projects/${project.slug}`} passHref>
          <ProjectLink project={project} />
        </Link>
      ))}
    </Layout>
  );
}

Page.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      previewImage: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export async function getStaticProps() {
  const projects = getAllProjects([
    'title',
    'description',
    'tags',
    'previewImage',
    'freelance',
    'slug',
  ]);
  return {
    props: { projects },
  };
}
