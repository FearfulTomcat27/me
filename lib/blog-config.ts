import catppuccinMocha from "@/lib/catppuccin-mocha";
import type { CSSProperties } from "react";

export interface BlogConfig {
  code: {
    /** react-syntax-highlighter 主题对象 */
    theme: Record<string, CSSProperties>;
    /** 代码块字体 */
    fontFamily: string;
    /** 代码块字号 */
    fontSize: string;
    /** 代码块行高 */
    lineHeight: string;
    /** 代码块背景色（需与主题一致） */
    background: string;
    /** 语言标签文字颜色 */
    langLabelColor: string;
  };
  prose: {
    /** 正文字号（Tailwind class） */
    fontSize: string;
    /** 正文行高（Tailwind class） */
    lineHeight: string;
  };
}

const blogConfig: BlogConfig = {
  code: {
    theme: catppuccinMocha,
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: "14px",
    lineHeight: "1.75",
    background: "#1e1e2e",
    langLabelColor: "#cba6f7",
  },
  prose: {
    fontSize: "text-sm md:text-base",
    lineHeight: "leading-relaxed",
  },
};

export default blogConfig;
