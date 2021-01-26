import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import ago from 's-ago';

const blogDir = join(process.cwd(), 'content', 'blog');
const projectDir = join(process.cwd(), 'content', 'projects');
const contentDir = join(process.cwd(), 'content');

export function getAbout() {
  const path = join(contentDir, 'about.md');
  const fileContents = fs.readFileSync(path, 'utf8');
  const { content } = matter(fileContents);
  return content;
}

export function getProjectSlugs() {
  return fs.readdirSync(projectDir);
}

export function getProjectBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(projectDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        items[field] = realSlug;
        break;

      case 'content':
        items[field] = content;
        break;

      default:
        items[field] = data[field];
        break;
    }
  });

  return items;
}

export function getAllProjects(fields = []) {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    .sort((project1, project2) => (project1.sort > project2.sort ? '-1' : '1'));
  return projects;
}

export function getBlogSlugs() {
  return fs.readdirSync(blogDir);
}

export function getBlogBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(blogDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const { text: timeToRead } = readingTime(fileContents);

  const items = {};

  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        items[field] = realSlug;
        break;

      case 'content':
        items[field] = content;
        break;

      case 'timeToRead':
        items[field] = timeToRead;
        break;

      case 'ago':
        items[field] = ago(new Date(Date.parse(data.date)));
        break;

      case 'date':
        items[field] = new Date(data.date).toISOString();
        break;

      default:
        items[field] = data[field];
        break;
    }
  });

  return items;
}

export function getAllBlogs(fields = []) {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
  return blogs;
}
