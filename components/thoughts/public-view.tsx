"use client";

import "./editor.css";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MessageCircle, MapPin } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Thought } from "@/types/thoughts";
import { StoryMode } from "./story-mode";

interface PublicThoughtViewProps {
  thought: Thought;
}

const springTransition = {
  type: "spring",
  damping: 12,
  stiffness: 100,
};

const textAnimation = {
  initial: {
    opacity: 0,
    scale: 0.5,
    y: 20,
  },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...springTransition,
      delay: 0.7 + i * 0.1,
    },
  }),
};

export function PublicThoughtView({ thought }: PublicThoughtViewProps) {
  // Determine if we should use large text based on content length
  const isShortContent = thought.content.length < 100;
  const hasNoTitle = !thought.title;
  const useLargeText = isShortContent && hasNoTitle && !thought.is_story_mode;

  // Split content into segments based on markdown
  const parseMarkdownSegments = (text: string) => {
    // Match bold and italic patterns while preserving spaces
    const segments = text.split(/(\*\*.*?\*\*|\*.*?\*|\s+)/g).filter(Boolean);
    return segments.map((segment) => {
      if (segment.match(/^\s+$/)) {
        // Return space segments as-is
        return { type: "space", content: segment };
      } else if (segment.startsWith("**") && segment.endsWith("**")) {
        return { type: "bold", content: segment.slice(2, -2) };
      } else if (segment.startsWith("*") && segment.endsWith("*")) {
        return { type: "italic", content: segment.slice(1, -1) };
      }
      return { type: "text", content: segment };
    });
  };

  const segments = useLargeText ? parseMarkdownSegments(thought.content) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] bg-background flex flex-col w-full"
    >
      <div className="mx-auto px-4 py-8 max-w-3xl flex-grow flex flex-col items-center w-full">
        <motion.article
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose dark:prose-invert max-w-none flex flex-col items-center flex-grow w-full"
        >
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center items-center mb-3"
            >
              <div className="rounded-full bg-foreground/10 p-4">
                <MessageCircle className="h-8 w-8 text-foreground" />
              </div>
            </motion.div>
            {thought.title && (
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl sm:text-4xl font-bold mb-2 text-center"
              >
                {thought.title}
              </motion.h1>
            )}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-muted-foreground"
            >
              <time dateTime={thought.created_at}>
                {format(new Date(thought.created_at), "MMMM d, yyyy")}
              </time>
              {!!thought.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          </motion.header>
          <div
            className={`flex flex-col items-center justify-center w-full ${
              useLargeText || thought.is_story_mode ? "flex-grow" : ""
            }`}
          >
            {thought.is_story_mode ? (
              <StoryMode
                content={thought.content}
                images={thought.images || []}
              />
            ) : useLargeText ? (
              <motion.div className="flex flex-wrap justify-center items-center gap-y-2 text-4xl sm:text-5xl font-medium leading-relaxed text-center">
                {segments.map((segment, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={textAnimation}
                    initial="initial"
                    animate="animate"
                    className={`inline-block ${
                      segment.type === "bold" ? "font-bold" : ""
                    } ${segment.type === "italic" ? "italic" : ""} ${
                      segment.type === "space" ? "w-[0.25em]" : ""
                    }`}
                  >
                    {segment.content}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                }}
                className="w-full markup-editor"
              >
                <ReactMarkdown
                  allowedElements={[
                    "h1",
                    "h2",
                    "h3",
                    "p",
                    "ul",
                    "ol",
                    "li",
                    "blockquote",
                    "code",
                    "em",
                    "strong",
                    "a",
                    "img",
                    "hr",
                    "br",
                  ]}
                >
                  {thought.content}
                </ReactMarkdown>
              </motion.div>
            )}
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
