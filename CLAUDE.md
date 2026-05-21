# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器 (localhost:3000)
pnpm build            # 生产构建
pnpm start            # 启动生产服务器
pnpm lint             # ESLint 检查
```

## 技术栈

- **框架**: Next.js 16 (App Router) + React 19
- **语言**: TypeScript 6，strict 模式
- **样式**: Tailwind CSS v4，使用 OKLCH CSS 变量进行主题切换
- **图标库**: lucide-react
- **主题**: next-themes，但 `ThemeToggle` 组件直接操作 `document.documentElement.classList` 和 localStorage，实际主题控制以 `ThemeToggle` 为准
- **Markdown**: react-markdown + remark-gfm（渲染）、gray-matter（frontmatter 解析）
- **语法高亮**: react-syntax-highlighter（Prism），主题为 Catppuccin Mocha
- **包管理**: pnpm

## 项目架构

这是一个个人作品集 + 博客网站，主页通过 tab 切换展示不同区块，博客文章有独立详情路由。

### 页面结构

- `app/layout.tsx` — 根布局，使用 Poppins 字体（CSS variable `--font-poppins`），含 Vercel Analytics
- `app/page.tsx` — 服务端组件，调用 `getAllPosts()` 读取博客列表后传给 `PortfolioShell`
- `app/blog/[slug]/page.tsx` — 博客详情页（SSG），从 Markdown 文件读取内容并渲染
- `app/blog/assets/[...path]/route.ts` — Route Handler，从 `content/blog/assets/` 提供内联图片
- `app/blog/cover/[...path]/route.ts` — Route Handler，从 `content/blog/cover/` 提供封面图

### 数据流

#### 主页数据
`lib/portfolio-data.ts` 是主页所有非博客数据的唯一源，导出以下对象：

- `profileData` — 姓名、头像、联系方式、GitHub 链接
- `aboutData` — 个人描述 + 服务列表（icon 用字符串映射到 lucide 组件）
- `resumeData` — 教育经历、实习经历、技能（含百分比进度）
- `portfolioData` — 作品分类 + 项目列表（含筛选功能）
- `contactData` — 联系方式 + Google Maps 嵌入 URL

#### 博客数据
`lib/blog.ts` 提供文件系统驱动的博客数据，读取 `content/blog/*.md`：

- `getAllPosts()` — 扫描目录，解析 frontmatter，按日期倒序返回文章元数据列表
- `getPostBySlug(slug)` — 读取单篇文章的 frontmatter + Markdown 正文
- `normalizeCoverImage()` — 将 `cover/xxx.png` 转为 `/blog/cover/xxx.png`，未填写时返回 `/blog/cover/placeholder.svg`

### 组件说明

**主页组件**
- `components/portfolio-shell.tsx` — `"use client"`，接收 `posts` prop，管理 `activeSection` tab 状态，渲染整个主页框架
- `components/profile-sidebar.tsx` — 左侧个人卡片（头像、联系方式、GitHub），内含内联 `GitHubIcon` SVG
- `components/about-section.tsx` — "关于我" + "我正在做什么"（icon 字符串到组件的映射）
- `components/resume-section.tsx` — 时间线式教育/实习经历 + 技能进度条
- `components/portfolio-section.tsx` — `"use client"`，含分类筛选 + 项目卡片 hover 效果
- `components/blog-section.tsx` — `"use client"`，博客卡片网格，含按 `category` 筛选功能
- `components/contact-section.tsx` — `"use client"`，Google Maps iframe + 联系表单（表单提交仅 console.log，未连接后端）
- `components/theme-toggle.tsx` — 主题切换按钮，直接操作 DOM class 和 localStorage
- `components/theme-provider.tsx` — next-themes 的 ThemeProvider 封装
- `components/project-card.tsx` — 独立项目卡片（使用 `next/image`），当前未被引用

**博客组件**
- `components/blog-content.tsx` — `"use client"`，react-markdown 渲染器，自定义所有 Markdown 元素样式，图片路径自动转换（`./assets/` → `/blog/assets/`）
- `components/code-block.tsx` — `"use client"`，代码块组件，含语法高亮（SyntaxHighlighter）、横向滚动、复制按钮（2s 后复原）
- `components/table-of-contents.tsx` — `"use client"`，博客详情页悬浮目录，`fixed` 定位于视口右侧，使用 IntersectionObserver 追踪当前节

### lib 工具说明

- `lib/portfolio-data.ts` — 主页静态数据
- `lib/blog.ts` — 博客文件系统读取（`getAllPosts` / `getPostBySlug`）
- `lib/blog-config.ts` — 博客渲染配置（代码主题、字体、字号等），修改此文件即可全局调整博客样式
- `lib/catppuccin-mocha.ts` — react-syntax-highlighter 的 Catppuccin Mocha 主题对象
- `lib/toc.ts` — 目录工具：`slugify`、`nodeToText`（React 节点转文本）、`extractHeadings`（从 Markdown 文本提取 h2/h3）
- `lib/utils.ts` — `cn()` 工具函数（clsx + tailwind-merge）

### 博客内容目录

```
content/blog/
├── assets/      # Markdown 正文内联图片（引用方式：./assets/foo.png）
├── cover/       # 文章封面图（frontmatter image 字段：cover/foo.png）
└── *.md         # 博客文章（文件名即 slug）
```

Markdown frontmatter 必填字段：`title`、`date`（ISO格式，用于排序）、`dateDisplay`（显示用）、`category`、`excerpt`、`tags`、`readTime`。`image` 省略时自动使用 `/blog/cover/placeholder.svg`。

### CSS 主题系统

`app/globals.css` 定义了 `:root`（浅色）和 `.dark`（深色）两套 OKLCH 变量，通过 `@theme inline` 映射为 Tailwind color tokens。自定义动画：`pulse-slow`（头像边框）、`marquee`/`marquee-slow`。`.scrollbar-hide` 用于移动端导航滚动条隐藏。

### 注意事项

- TypeScript 的 `ignoreBuildErrors: true`（`next.config.mjs`），构建不会因类型错误失败
- `images.unoptimized: true`，不使用 Next.js 图片优化
- `tsconfig.json` 中 `@/*` 映射到项目根目录
- ESLint 依赖 Next.js 内置，未单独安装到 devDependencies
- `app/page.tsx` 是服务端组件（无 `"use client"`），客户端交互逻辑在 `PortfolioShell`

## 设计风格规范

后续生成任何新页面或组件时，必须严格遵循以下风格。

### 配色系统

使用 OKLCH 色彩空间，通过 CSS 变量定义语义色板，在 `globals.css` 中由 `@theme inline` 映射为 Tailwind tokens：

| Token | 用途 |
|---|---|
| `background` | 页面背景 |
| `foreground` | 正文文字颜色 |
| `card` | 卡片/容器背景 |
| `secondary` | 次级容器背景（标签、输入框背景、区块底色） |
| `muted-foreground` | 次要文字（描述文本、标签、元信息） |
| `accent` | 强调色（蓝紫色 ~0.22 色度），用于图标、链接、按钮背景、hover 边框 |
| `accent-foreground` | 强调色背景上的文字 |
| `border` | 所有边框颜色 |

**典型使用模式**:
- 页面大背景: `bg-background`
- 卡片/侧边栏: `bg-card border border-border rounded-2xl`
- 次级区块/标签: `bg-secondary`
- 强调色: `text-accent`、`bg-accent`、`border-accent`
- hover 边框: `hover:border-accent hover:shadow-lg hover:shadow-accent/10`

### 排版

- **字体**: Poppins（`--font-poppins`），sans-serif 回退
- **字号梯度**: `text-xs` → `text-sm` → `text-base` → `text-lg` → `text-xl` → `text-2xl/3xl`
- **响应式字号**: 移动端较小，md 断点加大，如 `text-2xl md:text-3xl`
- **标题字重**: `font-bold`（区块标题）、`font-semibold`（卡片标题）

### 区块标题模式

所有新 section 必须复制此结构：

```tsx
<div>
  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">区块标题</h2>
  <div className="w-10 h-1 bg-accent rounded-full mb-6" />
</div>
```

### 圆角系统

- 大卡片: `rounded-2xl` 或 `rounded-xl md:rounded-2xl`
- 按钮/标签/输入框: `rounded-xl`
- 小徽章: `rounded-lg` 或 `rounded-full`
- 头像: `rounded-3xl`

### 间距系统

- 区块间距: `space-y-6 md:space-y-8`
- 卡片内边距: `p-4 md:p-6`（小卡片）、`p-4 md:p-5`（紧凑卡片）
- 网格间距: `gap-4 md:gap-6`
- 页面外边距: `p-3 sm:p-4 md:p-6 lg:p-12`

### 卡片模式

```tsx
{/* 基础卡片 */}
<div className="bg-secondary rounded-xl md:rounded-2xl border border-border p-4 md:p-6">

{/* 可交互卡片 */}
<div className="bg-secondary rounded-xl md:rounded-2xl border border-border
  hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
```

### 按钮模式

```tsx
{/* 主要按钮 */}
<button className="px-4 md:px-5 py-2 md:py-2.5 bg-accent text-accent-foreground rounded-xl
  text-xs md:text-sm font-medium hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all">

{/* 次要按钮 */}
<button className="px-4 md:px-5 py-2 md:py-2.5 bg-secondary text-muted-foreground
  rounded-xl text-xs md:text-sm font-medium hover:text-foreground hover:bg-secondary/80 transition-all">
```

### 响应式断点策略

- `sm:` (640px) — 小屏手机横屏，调整 padding/gap
- `md:` (768px) — 平板，字号加大，网格从 1 列变 2 列
- `lg:` (1024px) — 桌面，侧边栏固定在左侧，网格变 3 列
- `xl:` (1280px) — 博客详情页显示悬浮目录

### 主题切换实现

`ThemeToggle` 独立控制，不依赖 next-themes 的 `useTheme` hook：
1. 状态 `useState<'light' | 'dark'>`，默认 `'dark'`
2. 通过 `document.documentElement.classList.toggle('dark', ...)` 切换
3. 偏好存入 `localStorage`，初始化时读取

### 动画

- **pulse-slow**: 头像边框，3s 循环 opacity 0.3~0.8
- **marquee/marquee-slow**: 30s/40s linear 无限循环，hover 暂停
- **通用过渡**: `transition-all duration-300`（颜色/阴影/边框）、`duration-500`（图片缩放）
