"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type EditorMode = "write" | "split" | "preview";

export function MarkdownView({
  children,
  empty = "Nothing written yet.",
}: {
  children: string;
  empty?: string;
}) {
  if (!children.trim()) return <p className="markdown-empty">{empty}</p>;

  return (
    <div className="markdown-view">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: linkChildren }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {linkChildren}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export function MarkdownEditor({
  value,
  onChange,
  label,
  placeholder,
  minHeight = 260,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  minHeight?: number;
}) {
  const [mode, setMode] = useState<EditorMode>("split");
  const modes: EditorMode[] = ["write", "split", "preview"];

  return (
    <div className="markdown-editor">
      <div className="markdown-toolbar">
        <span>{label}</span>
        <div role="group" aria-label="Editor view">
          {modes.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`markdown-panes mode-${mode}`}
        style={{ "--editor-min-height": `${minHeight}px` } as React.CSSProperties}
      >
        {mode !== "preview" && (
          <textarea
            aria-label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            spellCheck
          />
        )}
        {mode !== "write" && (
          <div className="markdown-preview" aria-label={`${label} preview`}>
            <MarkdownView>{value}</MarkdownView>
          </div>
        )}
      </div>
    </div>
  );
}
