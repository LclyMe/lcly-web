"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryModeProps {
  content: string;
}

const springTransition = {
  type: "spring",
  damping: 12,
  stiffness: 100,
};

const wordAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export function StoryMode({ content }: StoryModeProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const resetStory = () => {
    setCurrentSentenceIndex(0);
    setWords([]);
  };

  useEffect(() => {
    // Split content into sentences (handling multiple punctuation marks)
    const splitSentences = content
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => sentence.trim().length > 0);
    setSentences(splitSentences);
  }, [content]);

  useEffect(() => {
    if (currentSentenceIndex < sentences.length) {
      // Split current sentence into words
      const currentWords = sentences[currentSentenceIndex]
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWords(currentWords);

      // Set timer for next sentence
      const timer = setTimeout(() => {
        setCurrentSentenceIndex((prev) => prev + 1);
      }, currentWords.length * 50 + 3000);

      return () => clearTimeout(timer);
    }
  }, [currentSentenceIndex, sentences]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <AnimatePresence mode="wait">
        {currentSentenceIndex < sentences.length ? (
          <motion.div
            key={currentSentenceIndex}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center max-w-4xl px-4 flex flex-wrap justify-center gap-x-4 gap-y-2"
          >
            {words.map((word, index) => (
              <motion.span
                key={`${currentSentenceIndex}-${index}-${word}`}
                custom={index}
                variants={wordAnimation}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="replay"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
            className="flex flex-col items-center gap-4"
          >
            <Button
              onClick={resetStory}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {currentSentenceIndex < sentences.length && (
        <motion.div className="mt-8 w-24 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            key={currentSentenceIndex}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: words.length * 0.05 + 3,
              ease: "linear",
            }}
            className="h-full bg-primary rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
}
