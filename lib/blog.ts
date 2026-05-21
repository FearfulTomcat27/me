import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateDisplay: string;
  category: string;
  excerpt: string;
  tags: string[];
  image: string;
  readTime: string;
  content: string;
}

export type BlogPostMeta = Omit<BlogPost, 'content'>;

// 将 cover/xxx.png 或 ./cover/xxx.png 转为 /blog/cover/xxx.png，未设置时返回默认占位图
function normalizeCoverImage(image: string | undefined): string {
  if (!image) return '/blog/cover/placeholder.svg';
  return image.replace(/^(?:\.\/)?cover\//, '/blog/cover/');
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
      const { data } = matter(raw);
      return { slug, ...data, image: normalizeCoverImage(data.image) } as BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filepath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, content, ...data, image: normalizeCoverImage(data.image) } as BlogPost;
}
