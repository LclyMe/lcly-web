"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map/without-countries";
import Image from "next/image";
import { precomputedMap } from "@/lib/precomputed-uk-map";
import { useTheme } from "next-themes";

interface Point {
  lat: number;
  lng: number;
  label: string;
}

const UK_POINTS: Point[] = [
  { lat: 42, lng: -0.2276, label: "England" },
  { lat: 58.9533, lng: -3.1883, label: "Scotland" },
  { lat: 38, lng: -4.1791, label: "Wales" },
  { lat: 54.5973, lng: -7, label: "Northern Ireland" },
];

export function UKMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ map: JSON.parse(precomputedMap) });
  const lineColor = "#0ea5e9"; // Adding the same color as world map
  const { resolvedTheme: theme } = useTheme();
  const showLines = false; // Add this line to control line visibility
  const showPoints = true; // Add this line to control point visibility
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Check if we're on a large screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#0ea5e9" : "#0ea5e9",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    // UK bounds: lat: 49°N to 61°N, lng: -8°W to 2°E
    const UK_BOUNDS = {
      lat: { min: 49, max: 61 },
      lng: { min: -8, max: 2 },
    };

    // Scale coordinates to fit the SVG viewport
    const x =
      ((lng - UK_BOUNDS.lng.min) / (UK_BOUNDS.lng.max - UK_BOUNDS.lng.min)) *
      800;
    const y =
      ((UK_BOUNDS.lat.max - lat) / (UK_BOUNDS.lat.max - UK_BOUNDS.lat.min)) *
      400;
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50; // Increased curve height like world map
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    // Reverse the projection to get lat/lng
    const UK_BOUNDS = {
      lat: { min: 49, max: 59 },
      lng: { min: -9, max: 2 },
    };

    const lng =
      (x / 800) * (UK_BOUNDS.lng.max - UK_BOUNDS.lng.min) + UK_BOUNDS.lng.min;
    const lat =
      UK_BOUNDS.lat.max - (y / 400) * (UK_BOUNDS.lat.max - UK_BOUNDS.lat.min);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: isLargeScreen ? 0.2 : 1.0, // Longer delay only on mobile
      }}
      className="relative font-sans overflow-hidden h-full lg:h-[100dvh]"
    >
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-contain opacity-80 dark:opacity-40 md:h-[100dvh]"
        alt="UK map"
        height="1056"
        width="495"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        onClick={handleMapClick}
        style={{ cursor: "crosshair" }}
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Draw connections */}
        {showLines &&
          UK_POINTS.map((point, i) => {
            // Only draw lines from England (index 0) to other points
            if (i !== 0) return null;

            return UK_POINTS.slice(1).map((endPoint, j) => {
              const startPoint = projectPoint(point.lat, point.lng);
              const end = projectPoint(endPoint.lat, endPoint.lng);
              return (
                <motion.path
                  key={`path-${i}-${j}`}
                  d={createCurvedPath(startPoint, end)}
                  fill="none"
                  stroke="url(#path-gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 * j,
                    ease: "easeOut",
                  }}
                />
              );
            });
          })}

        {/* Draw points */}
        {showPoints &&
          UK_POINTS.map((point, i) => {
            const { x, y } = projectPoint(point.lat, point.lng);
            return (
              <g className="hidden lg:block" key={`point-${i}`}>
                <circle cx={x} cy={y} r="14" fill={lineColor} opacity="0.5">
                  <animate
                    attributeName="r"
                    from="16"
                    to="46"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={x} cy={y} r="10" fill={"currentColor"} />

                {/* Label card */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="ml-4"
                >
                  <rect
                    x={x + 20}
                    y={y - 10}
                    width={point.label.length * 10 + 40}
                    height="60"
                    rx="8"
                    fill="currentColor"
                    fillOpacity=".9"
                  />
                  <text
                    x={x + 32}
                    y={y + 27}
                    fontSize="24"
                    fill={theme === "dark" ? "black" : "white"}
                    className="font-medium"
                  >
                    {point.label}
                  </text>
                </motion.g>
              </g>
            );
          })}
      </svg>
      {/* </div> */}
    </motion.div>
  );
}
