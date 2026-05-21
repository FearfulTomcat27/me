import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, Folder } from "lucide-react";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { extractHeadings } from "@/lib/toc";
import { BlogContent } from "@/components/blog-content";
import { TableOfContents } from "@/components/table-of-contents";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} - YuYong`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <div className="min-h-screen bg-background">
      {headings.length > 0 && <TableOfContents headings={headings} />}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-2 text-muted-foreground rounded-xl border border-border text-sm font-medium hover:border-accent hover:text-accent transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </Link>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
            <Folder className="w-3 h-3" />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.dateDisplay}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}阅读
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 pb-6 border-b border-border">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Tag className="w-3.5 h-3.5 text-muted-foreground" />
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-secondary text-muted-foreground rounded-lg text-xs font-medium border border-border hover:border-accent hover:text-accent transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        <BlogContent content={post.content} />
      </div>
    </div>
  );
}
