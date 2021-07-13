import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import externalLinks from 'remark-external-links';

export default async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(externalLinks, { target: '_blank' })
    .use(html).use(prism)
    .process(markdown);
  return result.toString();
}
