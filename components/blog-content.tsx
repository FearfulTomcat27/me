'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify, nodeToText } from '@/lib/toc';
import blogConfig from '@/lib/blog-config';
import { CodeBlock } from '@/components/code-block';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className='prose-blog'>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className='text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 first:mt-0'>{children}</h1>
          ),
          h2: ({ children }) => (
            <>
              <h2
                id={slugify(nodeToText(children))}
                className='text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-6'
              >
                {children}
              </h2>
              <div className='w-10 h-1 bg-accent rounded-full mb-6 -mt-2' />
            </>
          ),
          h3: ({ children }) => (
            <h3
              id={slugify(nodeToText(children))}
              className='text-lg md:text-xl font-semibold text-foreground mt-8 mb-3 scroll-mt-6'
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => <h4 className='text-base font-semibold text-foreground mt-6 mb-2'>{children}</h4>,
          p: ({ children }) => (
            <p className='text-sm md:text-base text-foreground/85 leading-relaxed mb-4'>{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-accent underline underline-offset-2 hover:opacity-80 transition-opacity'
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className='list-disc list-outside ml-5 space-y-2 mb-4 text-sm md:text-base text-foreground/85'>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className='list-decimal list-outside ml-5 space-y-2 mb-4 text-sm md:text-base text-foreground/85'>
              {children}
            </ol>
          ),
          li: ({ children }) => <li className='leading-relaxed'>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className='border-l-4 border-accent pl-4 my-6 text-muted-foreground italic text-sm md:text-base'>
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              const lang = className?.replace('language-', '') ?? '';
              return <CodeBlock lang={lang} code={String(children).replace(/\n$/, '')} />;
            }
            return (
              <code
                className='px-1.5 py-0.5 bg-secondary border border-border rounded text-xs md:text-sm text-accent'
                style={{ fontFamily: blogConfig.code.fontFamily }}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className='overflow-x-auto my-6 rounded-xl border border-border'>
              <table className='w-full text-sm text-left'>{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className='bg-secondary text-foreground border-b border-border'>{children}</thead>
          ),
          tbody: ({ children }) => <tbody className='divide-y divide-border'>{children}</tbody>,
          th: ({ children }) => (
            <th className='px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground'>
              {children}
            </th>
          ),
          td: ({ children }) => <td className='px-4 py-3 text-foreground/85'>{children}</td>,
          hr: () => <hr className='border-border my-8' />,
          strong: ({ children }) => <strong className='font-semibold text-foreground'>{children}</strong>,
          em: ({ children }) => <em className='italic text-muted-foreground'>{children}</em>,
          img: ({ src, alt }) => {
            // 将 ./assets/foo.png 或 assets/foo.png 转为 /blog/assets/foo.png
            const resolvedSrc = src?.replace(/^(?:\.\/)?assets\//, '/blog/assets/') ?? src;
            return <img src={resolvedSrc} alt={alt} className='w-full rounded-xl border border-border my-6' />;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
