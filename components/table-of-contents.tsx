"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TocHeading } from "@/lib/toc";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 取最靠上的可见标题作为当前节
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-10% 0% -80% 0%", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed right-6 top-24 w-52 max-h-[calc(100vh-8rem)] overflow-y-auto bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <List className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">目录</span>
      </div>
      <div className="w-6 h-0.5 bg-accent rounded-full mb-4" />
      <ul className="space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? "0.75rem" : "0" }}
          >
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(h.id);
              }}
              className={`block text-xs leading-relaxed py-0.5 transition-colors truncate ${
                activeId === h.id
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={h.text}
            >
              {h.level === 3 && (
                <span className="mr-1 opacity-40">·</span>
              )}
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
