import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { getAllProjects } from '../../lib/api';
import Pagination from '../components/Pagination';
import { useIsMounted } from '../hooks';
import { Project } from '../interfaces/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
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
              <Tag key={tag} className="mr-2 mb-2" value={tag} />
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

interface ProjectLinkProps {
  href?: string;
  onClick?: () => void;
  project: Project;
}

const ProjectLink = React.forwardRef(({ href, onClick, project }: ProjectLinkProps, ref: React.ForwardedRef<any>) => (
  <a href={href} onClick={onClick} ref={ref}>
    <ProjectCard project={project} />
  </a>
));

const itemCountPerPage = 5;

function getFilteredProjects(projects: Project[], page: number): Project[] {
  const pageIndex = (page - 1) * itemCountPerPage;
  return projects.slice(pageIndex, pageIndex + itemCountPerPage);
}

interface PageProps {
  projects: Project[];
}

export default function Page({ projects }: PageProps) {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const isMounted = useIsMounted();

  const [filteredProjects, setFilteredProjects] = useState(
    () => getFilteredProjects(projects, page),
  );

  function onChangePage(newPage) {
    router.push(`/projects?page=${newPage}`);
  }

  useEffect(() => {
    if (!isMounted) {
      setFilteredProjects(getFilteredProjects(projects, page));
    }
  }, [isMounted, page]);

  return (
    <>
      <Head>
        <title>Chad Alen - Projects</title>
        <meta name="Description" content="Projects created by Chad Alen." />
      </Head>

      <Layout>
        <div className="mt-2">
          {filteredProjects.map((project) => (
            <Link
              key={project.title}
              href={`/projects/${project.slug}`}
              passHref
            >
              <ProjectLink project={project} />
            </Link>
          ))}
        </div>

        <div className="mb-8 mt-8">
          <Pagination
            itemCountPerPage={itemCountPerPage}
            pageRangeCount={5}
            totalItemCount={projects.length}
            activePage={page}
            onChange={onChangePage}
          />
        </div>
      </Layout>
    </>
  );
}

interface StaticProps {
  props: {
    projects: Partial<Project>[];
  }
}

export async function getStaticProps(): Promise<StaticProps> {
  const projects = getAllProjects([
    'title',
    'description',
    'tags',
    'previewImage',
    'sort',
    'slug',
  ]);
  return {
    props: { projects },
  };
}
