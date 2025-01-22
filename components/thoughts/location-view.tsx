"use client";

import { WorldMap } from "@/components/maps/world-map";
import { motion } from "framer-motion";

interface LocationViewProps {
  location: { latitude: number; longitude: number };
}

export function LocationView({ location }: LocationViewProps) {
  const dots = [
    {
      start: { lat: location.latitude, lng: location.longitude },
      end: { lat: location.latitude, lng: location.longitude },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full aspect-[2/1] rounded-lg overflow-hidden"
    >
      <WorldMap dots={dots} />
    </motion.div>
  );
}
