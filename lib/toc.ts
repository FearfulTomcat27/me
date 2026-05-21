import type { ReactNode } from "react";

export interface TocHeading {
  level: number;
  text: string;
  id: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w一-龥-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function nodeToText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeToText((node as { props: { children: ReactNode } }).props.children);
  }
  return "";
}

// 从原始 Markdown 文本中提取 h2/h3 标题
export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].trim();
    headings.push({ level: match[1].length, text, id: slugify(text) });
  }
  return headings;
}
