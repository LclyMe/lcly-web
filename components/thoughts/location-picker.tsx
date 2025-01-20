"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LocationPickerProps {
  onLocationSelect: (location: { latitude: number; longitude: number }) => void;
  selectedLocation?: { latitude: number; longitude: number };
}

export function LocationPicker({
  onLocationSelect,
  selectedLocation,
}: LocationPickerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

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

  const handleMapClick = (lat: number, lng: number) => {
    onLocationSelect({ latitude: lat, longitude: lng });
    setIsMapOpen(false);
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

      {/* <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Pick on Map
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Location</DialogTitle>
          </DialogHeader>
          <div className="h-[500px]">
            <InteractiveMap
              onLocationSelect={handleMapClick}
              initialLocation={selectedLocation}
            />
          </div>
        </DialogContent>
      </Dialog> */}

      {selectedLocation && (
        <span className="text-sm text-muted-foreground">
          {selectedLocation.latitude.toFixed(6)},{" "}
          {selectedLocation.longitude.toFixed(6)}
        </span>
      )}
    </div>
  );
}
