import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const blogDir = join(process.cwd(), 'content', 'blog')

export function getBlogSlugs() {
  process.stdout.write(`Posts Directory=${blogDir}\n`);
  return fs.readdirSync(blogDir)
}

export function getBlogBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogDir, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const { text: timeToRead } = readingTime(fileContents)

  const items = {}

  for (const field of fields) {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (field === 'timeToRead') {
      items[field] = timeToRead
    }

    if (data[field]) {
      items[field] = data[field]
    }
  }

  return items
}

export function getAllBlogs(fields = []) {
  const slugs = getBlogSlugs()
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return blogs
}
