"use client";

import { usePostcode } from "@/hooks/use-postcode";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import to prevent server-side rendering the map
const InteractiveMap = dynamic(
  () => import("@/components/map/interactive-map"),
  { ssr: false }
);

export default function MapPage() {
  const { savedLocation } = usePostcode();

  return (
    <div className="h-screen w-full bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-full w-full overflow-hidden"
      >
        <InteractiveMap savedLocation={savedLocation} />
      </motion.div>
    </div>
  );
}
