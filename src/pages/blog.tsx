import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { getAllBlogs } from '../../lib/api';
import DateFormatter from '../components/DateFormatter';
import Pagination from '../components/Pagination';
import { useIsMounted } from '../hooks';
import { Blog } from '../interfaces/blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => (
  <Card className="mb-4">
    <div className="flex">
      <div>
        <div className="flex items-center mb-2">
          <img
            src="/images/avatar-circle-90x90.png"
            alt="Avatar"
            className="inline-block mr-2"
            style={{ width: '48px', height: '48px' }}
          />

          <div className="inline-block text-base">
            <div className="font-bold">Chad Adams</div>

            <DateFormatter
              className="inline-block text-sm text-gray-500 mr-2"
              dateString={blog.date}
              formatString="MMM d, yyyy"
            />

            <div className="inline-block text-sm text-gray-500">
              {`(${blog.ago})`}
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>

        <div>
          {blog.tags
            && blog.tags.map((tag) => (
              <Tag key={tag} className="mr-2 mb-2" value={tag} />
            ))}
        </div>
      </div>
    </div>
    <hr className="mb-4 mt-2" />
    <p className="text-base mb-2">{blog.excerpt}</p>
    <p className="inline-block text-base">{blog.timeToRead}</p>
  </Card>
);

interface BlogLinkProps {
  href?: string;
  onClick?: () => void;
  blog: Blog;
}

const BlogLink = React.forwardRef(({ href, onClick, blog }: BlogLinkProps, ref: React.ForwardedRef<any>) => (
  <a href={href} onClick={onClick} ref={ref}>
    <BlogCard blog={blog} />
  </a>
));

const itemCountPerPage = 10;

function getFilteredBlogs(blogs, page) {
  const pageIndex = (page - 1) * itemCountPerPage;
  return blogs.slice(pageIndex, pageIndex + itemCountPerPage);
}

interface PageProps {
  blogs: Blog[];
}

export default function Page({ blogs }: PageProps) {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const isMounted = useIsMounted();

  const [filteredBlogs, setFilteredBlogs] = useState(() => getFilteredBlogs(blogs, page));

  function onChangePage(newPage) {
    router.push(`/blog?page=${newPage}`);
  }

  useEffect(() => {
    if (!isMounted) {
      setFilteredBlogs(getFilteredBlogs(blogs, page));
    }
  }, [isMounted, page]);

  return (
    <>
      <Head>
        <title>Chad Alen - Blogs</title>
        <meta name="Description" content="Blogs written by Chad Alen." />
      </Head>

      <Layout>
        <div className="mt-2">
          {filteredBlogs.map((blog) => (
            <Link key={blog.title} href={`/blog/${blog.slug}`} passHref>
              <BlogLink blog={blog} />
            </Link>
          ))}
        </div>

        <div className="mb-8 mt-8">
          <Pagination
            itemCountPerPage={itemCountPerPage}
            pageRangeCount={5}
            totalItemCount={blogs.length}
            activePage={page}
            onChange={onChangePage}
          />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const blogs = getAllBlogs([
    'title',
    'date',
    'tags',
    'excerpt',
    'timeToRead',
    'ago',
    'slug',
  ]);
  return {
    props: { blogs },
  };
}
