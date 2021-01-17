import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Breadcrumb from '../components/Breadcrumb';
import { getAllProjects } from '../../lib/api';

function ProjectCardList({ title, projects }) {
  return (
    <>
      <h1 className="mb-2 text-2xl">{title}</h1>

      {projects.map((project, index) => (
        <Link key={index} href={`/projects/${project.slug}`} passHref>
          <a>
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

                      {project.tags.map((tag, index) => {
                        return (
                          <Tag key={index} className="mr-2 mb-2">
                            {tag}
                          </Tag>
                        );
                      })}
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
          </a>
        </Link>
      ))}
    </>
  );
}

export default function Page({ projects }) {
  const freelanceProjects = projects.filter((project) => project.freelance);
  const personalProjects = projects.filter((project) => !project.freelance);

  return (
    <Layout>
      <Breadcrumb className="mb-4 mt-2">
        <Breadcrumb.Item to={'/'}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
      </Breadcrumb>

      <ProjectCardList
        title="Freelance Projects"
        projects={freelanceProjects}
      />
      <ProjectCardList title="Personal Projects" projects={personalProjects} />
    </Layout>
  );
}

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
