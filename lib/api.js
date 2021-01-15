import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

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

  const items = {}

  for (const field of fields) {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
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
