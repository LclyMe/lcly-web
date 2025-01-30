"use client";

import { animate, motion } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";

export interface AnimatedCardProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  images: Array<{
    src: string;
    alt: string;
    size?: "sm" | "md" | "lg";
    className?: string;
  }>;
}

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

export function AnimatedCard({
  className,
  title,
  description,
  images,
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        // shadow-[2px_4px_16px_0px_rgba(248,248,248,0.02)_inset]
        "w-full h-full flex flex-col mx-auto p-8 rounded-2xl bg-muted group",
        className
      )}
    >
      <Flag className="w-8 h-8 stroke-1.5 text-primary" />
      <div
        className={cn(
          "rounded-xl z-40 flex-grow",
          "[mask-image:radial-gradient(70%_70%_at_50%_50%,white_0%,transparent_100%)]"
          //   "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)]"
        )}
      >
        <AnimatedImages images={images} />
      </div>
      {title && (
        <h3 className="text-xl tracking-tight font-semibold py-2">{title}</h3>
      )}
      {description && (
        <p className="text-base font-normal text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}

function AnimatedImages({ images }: { images: AnimatedCardProps["images"] }) {
  const scale = [1, 1.05, 1];
  const transform = ["translateY(0px)", "translateY(-2px)", "translateY(0px)"];

  const sequence = images.map((_, index) => [
    `.image-${index + 1}`,
    { scale, transform },
    { duration: 0.4 },
  ]) as Array<
    [string, { scale: number[]; transform: string[] }, { duration: number }]
  >;

  useEffect(() => {
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 0,
    });
  }, [sequence]);

  return (
    <div className="overflow-hidden h-full relative flex items-center justify-center w-full">
      <div className="flex flex-row flex-shrink-0 justify-around items-center gap-4 w-full">
        {images.map((image, index) => (
          <Container
            key={index}
            className={cn(
              sizeMap[image.size || "lg"],
              `image-${index + 1}`,
              image.className
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover rounded-lg shadow-lg w-full h-full"
            />
          </Container>
        ))}
      </div>
      <AnimatedSparkles />
    </div>
  );
}

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `rounded-lg relative flex items-center justify-center bg-[rgba(248,248,248,0.01)]
      shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]`,
      className
    )}
    {...props}
  />
));
Container.displayName = "Container";

const AnimatedSparkles = () => (
  <div className="h-40 w-px absolute top-6 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
    <div className="w-10 h-20 top-1/2 -translate-y-1/2 absolute -left-10">
      <Sparkles />
    </div>
  </div>
);

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        />
      ))}
    </div>
  );
};
