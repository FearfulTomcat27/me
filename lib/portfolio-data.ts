export const profileData = {
  name: "Yu Yong",
  title: "全栈开发者",
  avatar: "/avatar.png",
  email: "fearfultomcat27@qq.com",
  phone: "+86 15892323376",
  birthday: "2002年8月",
  location: "重庆,中国",
  social: {
    github: "https://github.com/fearfultomcat27",
    twitter: "",
    instagram: "",
  },
};

export const aboutData = {
  description: ["我是一名目前就读于重庆邮电大学软件工程研二的学生，主要研究方向是Java后端、数据库、Agent开发等。"],
  services: [
    {
      icon: "Code",
      title: "前端开发",
      description: "使用 React、Next.js 和 TypeScript 构建现代、响应式的 Web 应用程序。",
    },
    {
      icon: "Zap",
      title: "后端开发",
      description: "利用 SpringBoot、Gin 和现代框架构建健壮的 API 和服务器端解决方案。",
    },
    {
      icon: "Astroid",
      title: "Agent应用",
      description: "使用Langchain、LangGraph等框架构建Agent应用。",
    },
    {
      icon: "Database",
      title: "数据库开发",
      description: "参与Apache IoTDB查询引擎的研发工作",
    },
  ],
};

export const resumeData = {
  education: [
    {
      title: "重庆科技大学-本科",
      period: "2020-2024",
      description: "攻读学士学位，专业计算机科学与技术。",
    },
    {
      title: "重庆邮电大学-研究生",
      period: "2024-2027",
      description: "攻读硕士学位，专业软件工程。",
    },
  ],
  experience: [
    {
      title: "天谋科技(北京)有限公司",
      period: "2024 — 2024",
      description: "参与 Apache 顶级开源项目 Apache IoTDB 与 Apache TsFile 的开发与维护。",
    },
  ],
  skills: [
    { name: "Java", level: 70 },
    { name: "Python", level: 60 },
    { name: "JavaScript", level: 60 },
  ],
};

export const portfolioData = {
  categories: ["全部", "网页开发", "后端开发"],
  projects: [
    {
      title: "Apache IoTDB",
      category: "后端开发",
      image: "/iotdb-preview.png",
      description: "Apache的顶级项目，国产时序数据库。",
      tech: ["Java", "分布式", "高读写"],
      liveUrl: "https://iotdb.apache.com",
      githubUrl: "https://github.com/apache/iotdb",
    },
    {
      title: "Jsonl预览",
      category: "网页开发",
      image: "/jlens-preview.png",
      description: "用于预览Jsonl的在线网页",
      tech: ["Next.js", "Tailwind CSS", "React"],
      liveUrl: "https://jlens.fearfultomcat27.top",
      githubUrl: "https://github.com/fearfulTomcat27/jlens",
    },
    {
      title: "WeTalk",
      category: "网页开发",
      image: "/wetalk-preview.png",
      description: "基于WebSocket的在线聊天网站。",
      tech: ["Next.js", "WebSocket", "Gin"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/fearfultomcat27/wetalk",
    },
  ],
};

export const blogData = {
  posts: [
    {
      title: "使用 Next.js 15 构建现代 Web 应用程序",
      category: "Web开发",
      date: "2024年6月18日",
      readTime: "8分钟",
      image: "/web-development-coding.png",
      excerpt: "深入探讨 Next.js 15 的新功能及 App Router 的增强功能。",
      tags: ["Next.js", "React", "Web开发"],
      slug: "building-modern-web-apps-nextjs-15",
    },
  ],
};

export const contactData = {
  email: "fearfultomcat27@qq.com",
  phone: "+86 15892323376",
  location: "重庆,中国",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.3542686742726!2d106.60273307547226!3d29.535175642520212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x369334409efe0c3f%3A0xbe66f5554dcb4f4e!2sChongqing%20University%20of%20Posts%20and%20Telecommunications!5e0!3m2!1sen!2sus!4v1778998973193!5m2!1sen!2sus",
};
