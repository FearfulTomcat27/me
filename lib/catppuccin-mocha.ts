import type { CSSProperties } from "react";

// Catppuccin Mocha palette
const c = {
  base: "#1e1e2e",
  text: "#cdd6f4",
  overlay0: "#6c7086",
  overlay1: "#7f849c",
  overlay2: "#9399b2",
  surface1: "#45475a",
  red: "#f38ba8",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  blue: "#89b4fa",
  mauve: "#cba6f7",
  pink: "#f5c2e7",
  rosewater: "#f5e0dc",
};

const base: CSSProperties = {
  color: c.text,
  background: c.base,
  fontFamily: "Consolas, 'Courier New', monospace",
  fontSize: "14px",
  lineHeight: "1.75",
  tabSize: 2,
};

const catppuccinMocha: Record<string, CSSProperties> = {
  'code[class*="language-"]': base,
  'pre[class*="language-"]': { ...base, background: c.base },

  comment: { color: c.overlay0, fontStyle: "italic" },
  prolog: { color: c.overlay0, fontStyle: "italic" },
  doctype: { color: c.overlay0 },
  cdata: { color: c.overlay0 },

  punctuation: { color: c.overlay2 },

  property: { color: c.red },
  tag: { color: c.red },
  deleted: { color: c.red },

  boolean: { color: c.peach },
  number: { color: c.peach },
  constant: { color: c.peach },

  selector: { color: c.green },
  "attr-name": { color: c.green },
  string: { color: c.green },
  char: { color: c.green },
  builtin: { color: c.green },
  inserted: { color: c.green },

  operator: { color: c.sky },
  entity: { color: c.sky },
  url: { color: c.sky },
  variable: { color: c.sky },

  atrule: { color: c.mauve },
  "attr-value": { color: c.mauve },
  keyword: { color: c.mauve },

  function: { color: c.blue },
  "function-name": { color: c.blue },
  "class-name": { color: c.yellow },

  regex: { color: c.peach },
  important: { color: c.peach, fontWeight: "bold" },

  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },

  namespace: { color: c.teal },
  symbol: { color: c.rosewater },

  "maybe-class-name": { color: c.yellow },
  parameter: { color: c.rosewater },
  "template-string": { color: c.green },
  "template-punctuation": { color: c.overlay2 },
  "interpolation-punctuation": { color: c.mauve },
};

export default catppuccinMocha;
