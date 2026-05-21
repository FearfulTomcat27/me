'use client';

import { useState, useMemo } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogSectionProps {
  posts: BlogPostMeta[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const [activeTag, setActiveTag] = useState('全部');

  const allTags = useMemo(() => {
    const categorySet = new Set<string>();
    posts.forEach((post) => categorySet.add(post.category));
    return ['全部', ...Array.from(categorySet)];
  }, [posts]);

  const filteredPosts = activeTag === '全部' ? posts : posts.filter((post) => post.category === activeTag);

  return (
    <div className='space-y-6 md:space-y-8'>
      <div>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>博客</h2>
        <div className='w-10 h-1 bg-accent rounded-full mb-6' />
      </div>

      {/* 标签筛选 */}
      <div className='flex flex-wrap gap-2 md:gap-3'>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeTag === tag
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className='text-muted-foreground text-sm'>该标签下暂无文章。</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className='group bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300'
            >
              <div className='aspect-video overflow-hidden bg-background'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-4 md:p-5'>
                <div className='flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-3'>
                  <span className='px-2.5 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full font-medium'>
                    {post.category}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Calendar className='w-3 h-3 md:w-3.5 md:h-3.5' />
                    {post.dateDisplay}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Clock className='w-3 h-3 md:w-3.5 md:h-3.5' />
                    {post.readTime}
                  </span>
                </div>
                <h3 className='text-base md:text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors'>
                  {post.title}
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground leading-relaxed mb-4'>{post.excerpt}</p>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {post.tags.map((tag, i) => (
                    <span key={i} className='text-xs px-2 py-0.5 md:py-1 bg-background rounded text-muted-foreground'>
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`/blog/${post.slug}`}
                  className='flex items-center gap-2 text-xs md:text-sm text-accent hover:gap-3 transition-all font-medium'
                >
                  阅读详细
                  <ArrowRight className='w-3.5 h-3.5 md:w-4 md:h-4' />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
