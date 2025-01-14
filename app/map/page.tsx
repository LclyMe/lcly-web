"use client";

import { usePostcode } from "@/hooks/use-postcode";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LclyLogo from "@/components/logos/LclyLogo";
import dynamic from "next/dynamic";

// Dynamic import to prevent server-side rendering the map
const InteractiveMap = dynamic(
  () => import("@/components/map/interactive-map"),
  { ssr: false }
);

export default function MapPage() {
  const { savedLocation } = usePostcode();

  return (
    <div className="h-screen w-full bg-black md:pb-8 md:px-8">
      <div className="hidden sm:flex items-center gap-2 py-3 px-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/union-flag.png"
            alt="Union Flag"
            width={48}
            height={48}
            className="h-5 w-5 rounded-full"
          />
          <LclyLogo className="h-4 w-auto text-white/90 -mb-1.5" />
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[100dvh] sm:h-[calc(100vh-76px)] w-full sm:rounded-3xl overflow-hidden sm:border border-border border-white/20 shadow-xl"
      >
        <InteractiveMap savedLocation={savedLocation} />
      </motion.div>
    </div>
  );
}
