import React from 'react';
import Head from 'next/head';
// import ReactDisqusComments from 'react-disqus-comments';
import Layout from '../../components/ContentLayout';
import Tag from '../../components/Tag';
import DateFormatter from '../../components/DateFormatter';
import { getAllBlogs, getBlogBySlug } from '../../../lib/api';
import { markdownToHtml } from '../../util';
import { Blog } from '../../interfaces/blog';
// import settings from '../../settings';

interface PageProps {
  blog: Blog;
}

export default function Page({ blog }: PageProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>{`Chad Alen - ${blog.title}`}</title>
        <meta name="Description" content="A blog written by Chad Alen." />
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
        <article className="prose lg:prose-xl px-3 sm:px-8 m-auto my-16">

          <h1
            className="text-5xl font-bold mb-4"
            style={{ marginBottom: '1rem' }}
          >
            {blog.title}
          </h1>

          <div className="mb-2">
            {blog.tags
              && blog.tags.map((tag) => (
                <Tag key={tag} className="mr-2 mb-2 p-1" value={tag} />
              ))}
          </div>

          <div className="flex items-center mb-4">
            <img
              src="/images/avatar-circle-90x90.png"
              alt="Avatar"
              className="inline-block mr-2 my-0"
              style={{
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            />

            <div className="inline-block text-base">
              <div className="font-bold">Chad Adams</div>

              <div className="text-sm text-gray-500">
                <DateFormatter
                  className="inline-block mr-2"
                  dateString={blog.date}
                  formatString="MMM d, yyyy"
                />
                &#8226;
                {` ${blog.timeToRead}`}
              </div>
            </div>
          </div>

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* <ReactDisqusComments
          shortname={settings.disqusShortname}
          identifier={blog.slug}
          title={blog.title}
        /> */}
      </Layout>
    </>
  );
}

interface StaticProps {
  props: {
    blog: Partial<Blog>;
  }
}

export async function getStaticProps({ params }: PathParam): Promise<StaticProps> {
  const blog = getBlogBySlug(params.slug, [
    'title',
    'date',
    'tags',
    'excerpt',
    'timeToRead',
    'ago',
    'slug',
    'content',
  ]);

  const content = await markdownToHtml(blog.content);

  return {
    props: {
      blog: {
        ...blog,
        content,
      },
    },
  };
}

interface PathParam {
  params: {
    slug: string;
  }
}

interface StaticPaths {
  paths: PathParam[];
  fallback: boolean;
}

export async function getStaticPaths(): Promise<StaticPaths> {
  const blogs = getAllBlogs(['slug']);

  return {
    paths: blogs.map((blog) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: false,
  };
}
