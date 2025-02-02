"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "./back-button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface PageHeaderWithIconProps {
  icon: LucideIcon;
  title: string;
  backHref?: string;
  hideBackButton?: boolean;
}

export function PageHeaderWithIcon({
  icon: Icon,
  title,
  backHref,
  hideBackButton,
}: PageHeaderWithIconProps) {
  return (
    <div className="relative">
      {!hideBackButton && (
        <div className="absolute left-0 top-0">
          {backHref ? (
            <Link href={backHref}>
              <Button variant="secondary" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <BackButton />
          )}
        </div>
      )}

      <motion.div {...fadeIn} className="mb-8 flex flex-col items-center">
        <div className="rounded-full bg-foreground/10 p-4">
          <Icon className="h-8 w-8 text-foreground" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      </motion.div>
    </div>
  );
}
