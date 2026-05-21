# Yu Yong — 个人主页

基于 Next.js 构建的个人作品集 + 博客网站，支持深色/浅色主题切换，博客内容由本地 Markdown 文件驱动。

## 功能

- **作品集**：项目展示，支持分类筛选
- **博客**：基于文件系统的 Markdown 博客，支持分类筛选、目录导航、语法高亮、复制代码
- **简历**：时间线式教育/实习经历 + 技能进度条
- **联系**：联系表单 + Google Maps 嵌入
- **主题切换**：深色/浅色模式，偏好持久化到 localStorage

## 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | Next.js 16 (App Router) + React 19 |
| 语言 | TypeScript 6 |
| 样式 | Tailwind CSS v4 + OKLCH CSS 变量 |
| 图标 | lucide-react |
| 主题 | next-themes |
| Markdown | react-markdown + remark-gfm + gray-matter |
| 语法高亮 | react-syntax-highlighter (Catppuccin Mocha) |
| 包管理 | pnpm |
| 部署 | Vercel |

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## 博客系统

所有博客内容存放在 `content/blog/` 目录，**无需修改任何代码**，构建时自动扫描。

### 目录结构

```
content/blog/
├── assets/          # Markdown 正文内联图片
├── cover/           # 文章封面图（frontmatter image 字段）
├── post-a.md
└── post-b.md
```

### 新建文章

在 `content/blog/` 下创建 `.md` 文件，frontmatter 格式如下：

```markdown
---
title: "文章标题"
date: "2024-06-18"
dateDisplay: "2024年6月18日"
category: "分类"
excerpt: "摘要，显示在卡片和详情页标题下方"
tags: ["Tag1", "Tag2"]
image: "cover/my-cover.png"   # 省略则使用默认占位图
readTime: "5分钟"
---

正文 Markdown 内容...
```

### 图片引用

正文内联图片放入 `content/blog/assets/`，使用相对路径引用：

```markdown
![描述](./assets/image.png)
```

封面图放入 `content/blog/cover/`，在 frontmatter 中填写 `image: "cover/filename.png"`。

### 博客配置

代码块主题、字体、字号等集中在 `lib/blog-config.ts` 中管理：

```ts
code: {
  theme: catppuccinMocha,                   // 切换语法高亮主题
  fontFamily: "Consolas, 'Courier New', monospace",
  fontSize: "14px",
  lineHeight: "1.75",
  background: "#1e1e2e",
  langLabelColor: "#cba6f7",
},
```

## 构建与部署

```bash
pnpm build
pnpm start
```

## 许可

[MIT](./LICENSE)
