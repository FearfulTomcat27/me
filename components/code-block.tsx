'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check } from 'lucide-react';
import blogConfig from '@/lib/blog-config';

interface CodeBlockProps {
  lang: string;
  code: string;
}

export function CodeBlock({ lang, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { code: cfg } = blogConfig;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='my-6 rounded-xl overflow-hidden border border-border'>
      {/* 顶栏：语言标签 + 复制按钮 */}
      <div
        className='flex items-center justify-between px-4 py-2 border-b border-border'
        style={{ background: cfg.background }}
      >
        <span className='text-xs font-medium' style={{ color: cfg.langLabelColor, fontFamily: cfg.fontFamily }}>
          {lang || ' '}
        </span>
        <button
          onClick={handleCopy}
          aria-label='复制代码'
          className='flex items-center gap-1 text-xs transition-colors'
          style={{ color: copied ? '#a6e3a1' : cfg.langLabelColor }}
        >
          {copied ? (
            <>
              <Check className='w-3.5 h-3.5' />
              已复制
            </>
          ) : (
            <>
              <Copy className='w-3.5 h-3.5' />
              复制
            </>
          )}
        </button>
      </div>

      {/* 代码区 */}
      <SyntaxHighlighter
        language={lang || 'text'}
        style={cfg.theme}
        PreTag='div'
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: '1rem',
          fontSize: cfg.fontSize,
          lineHeight: cfg.lineHeight,
          background: cfg.background,
          overflowX: 'auto',
        }}
        codeTagProps={{ style: { fontFamily: cfg.fontFamily } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
