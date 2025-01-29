"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { BookOpen, BookOpenText } from "lucide-react";
import type { Components } from "react-markdown";

interface WhitepaperContentProps {
  source: string;
  eli5Source: string;
}

type HeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export function WhitepaperContent({
  source,
  eli5Source,
}: WhitepaperContentProps) {
  const [isEli5Mode, setIsEli5Mode] = useState(false);

  const markdownComponents: Components = {
    h1: (props: HeadingProps) => {
      const id = props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return <h1 id={id} {...props} />;
    },
    h2: (props: HeadingProps) => {
      const id = props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return <h2 id={id} {...props} />;
    },
    h3: (props: HeadingProps) => {
      const id = props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return <h3 id={id} {...props} />;
    },
    h4: (props: HeadingProps) => {
      const id = props.children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return <h4 id={id} {...props} />;
    },
    a: (props: AnchorProps) => (
      <a target="_blank" rel="noopener noreferrer" {...props} />
    ),
  };

  return (
    <>
      <div className="flex justify-end mb-8">
        <Button
          variant={isEli5Mode ? "default" : "outline"}
          onClick={() => setIsEli5Mode(!isEli5Mode)}
          className="flex items-center gap-2"
        >
          {isEli5Mode ? (
            <BookOpenText className="h-4 w-4" />
          ) : (
            <BookOpen className="h-4 w-4" />
          )}
          {isEli5Mode ? "Read Full Version" : "ELI5 Version"}
        </Button>
      </div>
      <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-[var(--scroll-mt)] prose-headings:font-heading prose-headings:font-bold prose-blockquote:border-l-2 prose-blockquote:border-slate-300 prose-blockquote:font-normal dark:prose-blockquote:border-slate-700 prose-blockquote:not-italic prose-li:my-0 prose-img:rounded-lg markup-editor">
        <ReactMarkdown components={markdownComponents}>
          {isEli5Mode ? eli5Source : source}
        </ReactMarkdown>
      </article>
    </>
  );
}
