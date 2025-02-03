"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon, Palette, PenLine } from "lucide-react";
import type { DataType } from "@/hooks/use-map-data";

interface MapControlsProps {
  selectedMapProvider: "dark" | "light" | "color";
  setSelectedMapProvider: (provider: "dark" | "light" | "color") => void;
  enabledDataTypes: DataType[];
  onToggleDataType: (type: DataType) => void;
}

const dataTypeConfig = {
  thoughts: {
    icon: PenLine,
    label: "Thoughts",
  },
  // people: {
  //   icon: Users,
  //   label: "People",
  // },
  // homes: {
  //   icon: Home,
  //   label: "Homes",
  // },
} as const;

export function MapControls({
  selectedMapProvider,
  setSelectedMapProvider,
  enabledDataTypes,
  onToggleDataType,
}: MapControlsProps) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 md:right-4 right-1 flex flex-col gap-2 bg-background/80 dark:border dark:border-border/30 backdrop-blur-sm p-2 rounded-full shadow-lg z-[1000]">
      <Button
        size="icon"
        variant={selectedMapProvider === "dark" ? "default" : "ghost"}
        onClick={() => setSelectedMapProvider("dark")}
        className="relative group"
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark Map</span>
        <div className="absolute right-full mr-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Dark Map
        </div>
      </Button>
      <Button
        size="icon"
        variant={selectedMapProvider === "light" ? "default" : "ghost"}
        onClick={() => setSelectedMapProvider("light")}
        className="relative group"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light Map</span>
        <div className="absolute right-full mr-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Light Map
        </div>
      </Button>
      <Button
        size="icon"
        variant={selectedMapProvider === "color" ? "default" : "ghost"}
        onClick={() => setSelectedMapProvider("color")}
        className="relative group"
      >
        <Palette className="h-4 w-4" />
        <span className="sr-only">Color Map</span>
        <div className="absolute right-full mr-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Color Map
        </div>
      </Button>
      <div className="w-full h-px bg-border my-1" />
      {(Object.keys(dataTypeConfig) as DataType[]).map((type) => {
        const { icon: Icon, label } = dataTypeConfig[type];
        const isEnabled = enabledDataTypes.includes(type);

        return (
          <Button
            key={type}
            size="icon"
            variant={isEnabled ? "default" : "ghost"}
            className="relative group"
            onClick={() => onToggleDataType(type)}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
            <div className="absolute right-full mr-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </div>
          </Button>
        );
      })}
    </div>
  );
}
