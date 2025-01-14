import { Button } from "@/components/ui/button";
import { Layers, Moon, Sun, Map as MapIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MapProvider = "dark" | "light" | "color";

export function MapControls({
  selectedMapProvider,
  setSelectedMapProvider,
}: {
  selectedMapProvider: MapProvider;
  setSelectedMapProvider: (provider: MapProvider) => void;
}) {
  const isDark = selectedMapProvider === "dark";
  const buttonVariant = isDark ? "secondary" : "default";

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-[1000]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={buttonVariant}
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[1000]" align="end">
          <DropdownMenuItem onClick={() => setSelectedMapProvider("dark")}>
            <Moon className="h-4 w-4" /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedMapProvider("light")}>
            <Sun className="h-4 w-4" /> Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedMapProvider("color")}>
            <MapIcon className="h-4 w-4" /> Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
