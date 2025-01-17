"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MessageCircle } from "lucide-react";
import type { Thought } from "@/types/thoughts";

interface PublicThoughtViewProps {
  thought: Thought;
}

export function PublicThoughtView({ thought }: PublicThoughtViewProps) {
  // Determine if we should use large text based on content length
  const isShortContent = thought.content.length < 100;
  const hasNoTitle = !thought.title;
  const useLargeText = isShortContent && hasNoTitle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background flex flex-col w-full"
    >
      <div className="mx-auto px-4 py-8 max-w-3xl flex-grow flex flex-col items-center w-full">
        <motion.article
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert mx-auto flex flex-col items-center flex-grow w-full"
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
              className="flex justify-center items-center gap-4 text-muted-foreground"
            >
              <time dateTime={thought.created_at}>
                {format(new Date(thought.created_at), "MMMM d, yyyy")}
              </time>
            </motion.div>
          </motion.header>
          <div
            className={`flex flex-col items-center justify-center ${
              useLargeText ? "flex-grow" : ""
            }`}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.7,
              }}
              className={`whitespace-pre-wrap mb-8 ${
                useLargeText
                  ? "text-4xl sm:text-5xl font-medium leading-relaxed text-center justify-center items-center"
                  : ""
              }`}
            >
              {thought.content}
            </motion.div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
