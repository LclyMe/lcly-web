"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (location: { latitude: number; longitude: number }) => void;
  selectedLocation?: { latitude: number; longitude: number };
}

export function LocationPicker({
  onLocationSelect,
  selectedLocation,
}: LocationPickerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={getCurrentLocation}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <MapPin className="h-4 w-4 mr-2" />
        )}
        Use Current Location
      </Button>

      {selectedLocation && (
        <span className="text-sm text-muted-foreground">
          {selectedLocation.latitude.toFixed(6)},{" "}
          {selectedLocation.longitude.toFixed(6)}
        </span>
      )}
    </div>
  );
}
