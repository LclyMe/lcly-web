import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Trash2 } from "lucide-react";

interface RecyclingCenter {
  id: number;
  site_name: string;
  address: string;
  post_code: string;
  location_type: string;
  site_type: string;
  latitude: number;
  longitude: number;
  accepts_mixed_glass: boolean;
  accepts_paper: boolean;
  accepts_textiles: boolean;
  accepts_small_electrical: boolean;
}

interface RecyclingCentersLayerProps {
  visible: boolean;
  selectedMapProvider: "dark" | "light" | "color";
}

export function RecyclingCentersLayer({
  visible,
  selectedMapProvider,
}: RecyclingCentersLayerProps) {
  const map = useMap();
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch recycling centers
  useEffect(() => {
    if (!visible) return;

    const fetchCenters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/recycling-centers");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCenters(data);
      } catch (err) {
        console.error("Failed to fetch recycling centers:", err);
        setError("Failed to load recycling centers");
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, [visible]);

  // Create and manage markers
  useEffect(() => {
    // Remove existing markers
    markers.forEach((marker) => marker.remove());

    if (!visible || centers.length === 0) {
      return;
    }

    // Add markers to the map
    const newMarkers = centers.map((center) => {
      // Create custom icon based on what the center accepts
      const iconHtml = `
        <div class="flex items-center justify-center w-full h-full rounded-full ${
          selectedMapProvider === "dark"
            ? "bg-white text-black"
            : "bg-primary text-white"
        }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </div>
      `;

      const marker = L.marker([center.latitude, center.longitude], {
        icon: L.divIcon({
          html: iconHtml,
          className: "recycling-center-icon",
          iconSize: L.point(24, 24),
        }),
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="p-3 max-w-[250px]">
          <h3 class="font-medium text-sm">${center.site_name}</h3>
          <p class="text-xs text-muted-foreground mt-1">${center.address}</p>
          <p class="text-xs text-muted-foreground">${center.post_code}</p>
          
          <div class="mt-2 flex flex-wrap gap-1">
            ${
              center.accepts_mixed_glass
                ? '<span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">Glass</span>'
                : ""
            }
            ${
              center.accepts_paper
                ? '<span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">Paper</span>'
                : ""
            }
            ${
              center.accepts_textiles
                ? '<span class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-full">Textiles</span>'
                : ""
            }
            ${
              center.accepts_small_electrical
                ? '<span class="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">Electronics</span>'
                : ""
            }
          </div>
          
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=${
              center.latitude
            },${center.longitude}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-3 text-xs flex items-center gap-1 text-primary hover:underline"
          >
            Get directions
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      return marker;
    });

    setMarkers(newMarkers);

    // Cleanup on unmount
    return () => {
      newMarkers.forEach((marker) => marker.remove());
    };
  }, [centers, map, visible, selectedMapProvider]);

  return null; // This component doesn't render anything directly
}
