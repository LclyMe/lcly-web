"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface StoryModeProps {
  content: string;
  images?: string[];
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

const imageAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.3,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

export function StoryMode({ content, images = [] }: StoryModeProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [sentences, setSentences] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const resetStory = () => {
    setCurrentSentenceIndex(0);
    setCurrentImageIndex(-1);
    setWords([]);
  };

  useEffect(() => {
    const splitSentences = content
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => sentence.trim().length > 0);
    setSentences(splitSentences);
  }, [content]);

  useEffect(() => {
    if (currentSentenceIndex < sentences.length) {
      const currentWords = sentences[currentSentenceIndex]
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWords(currentWords);

      // Show new image every few sentences
      if (
        images.length > 0 &&
        currentSentenceIndex > 0 &&
        currentSentenceIndex % Math.ceil(sentences.length / images.length) === 0
      ) {
        setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1));
      }

      const timer = setTimeout(() => {
        setCurrentSentenceIndex((prev) => prev + 1);
      }, currentWords.length * 50 + 3000);

      return () => clearTimeout(timer);
    }
  }, [currentSentenceIndex, sentences, images.length]);

  // Update the getRandomPosition function for more central positioning
  const getRandomPosition = () => {
    return {
      top: `${Math.random() * 20 + 40}%`, // 40-60% range for more central vertical positioning
      left: `${Math.random() * 20 + 40}%`, // 40-60% range for more central horizontal positioning
      transform: `translate(-50%, -50%) rotate(${Math.random() * 4 - 2}deg)`, // Reduced rotation range
    };
  };

  return (
    <div className="flex-grow w-full flex items-center justify-center overflow-hidden">
      {/* Fullscreen Image Background */}
      <AnimatePresence mode="wait">
        {currentImageIndex >= 0 && currentImageIndex < images.length && (
          <motion.div
            key={`image-${currentImageIndex}`}
            variants={imageAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          >
            <img
              src={images[currentImageIndex]}
              alt=""
              className="object-cover w-full h-full"
              sizes="100vw"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full gap-8 px-4 py-12">
        {/* Text Content */}
        <div className="bg-background/80 backdrop-blur-md rounded-xl p-8 max-w-4xl">
          <AnimatePresence mode="wait">
            {currentSentenceIndex < sentences.length ? (
              <motion.div
                key={currentSentenceIndex}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-4xl flex flex-wrap justify-center gap-x-4 gap-y-2"
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
        </div>

        {/* Progress Bar */}
        {currentSentenceIndex < sentences.length && (
          <motion.div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
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
    </div>
  );
}
