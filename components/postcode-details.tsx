"use client";

import { Badge } from "@/components/ui/badge";
import { Navigation, Building, Globe, User, Fullscreen } from "lucide-react";
import { PostcodeData } from "@/types/location";
import { useState } from "react";
import { LocationInfoSheet } from "@/components/location-info-sheet";
import { WeatherCard } from "@/components/weather-card";
import { StaticMap } from "@/components/static-map";
import { MPData } from "@/lib/server/mp";

interface Weather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  weather_code: number;
}

interface PostcodeDetailsProps {
  location: PostcodeData;
  weather?: Weather;
  mpData?: MPData | null;
}

export function PostcodeDetails({
  location,
  weather,
  mpData,
}: PostcodeDetailsProps) {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const locationInfo = {
    ward: {
      title: "Electoral Ward",
      description:
        "A ward is the smallest administrative division used for local government elections. Each ward elects local councillors who represent residents' interests in the local council.",
      value: location.admin_ward,
    },
    district: {
      title: "Administrative District",
      description:
        "Districts are larger areas that group several wards together. They are responsible for providing local services like waste collection, housing, and planning permissions.",
      value: location.admin_district,
    },
    constituency: {
      title: "Parliamentary Constituency",
      description:
        "A constituency is the area represented by a Member of Parliament (MP) in the House of Commons. Each constituency elects one MP to represent their interests in Parliament.",
      value: location.parliamentary_constituency,
    },
    region: {
      title: "Region",
      description:
        "Regions are large administrative areas that group multiple districts and constituencies. They often have their own development strategies and economic planning.",
      value: location.region,
    },
  };

  return (
    <div className="flex flex-col items-center pb-6 pt-16">
      {/* Postcode Info */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          Postcode
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
          {location.postcode}
        </h1>
        <p className="mx-auto max-w-2xl text-center text-muted-foreground text-lg">
          Explore your local area and get detailed information about this
          postcode.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Ward */}
        <div
          className="p-4 bg-gray-100 dark:bg-white/5 md:aspect-square border-none rounded-2xl py-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          onClick={() => setActiveSheet("ward")}
        >
          <div className="flex flex-col items-center gap-3 text-center h-full">
            <div className="flex-grow flex items-center justify-center">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Ward</div>
              <div className="text-sm text-muted-foreground">
                {location.admin_ward}
              </div>
            </div>
          </div>
        </div>

        {/* District */}
        <div
          className="p-4 bg-gray-100 dark:bg-white/5 md:aspect-square border-none rounded-2xl py-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          onClick={() => setActiveSheet("district")}
        >
          <div className="flex flex-col items-center gap-3 text-center h-full">
            <div className="flex-grow flex items-center justify-center">
              <Navigation className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">District</div>
              <div className="text-sm text-muted-foreground">
                {location.admin_district}
              </div>
            </div>
          </div>
        </div>

        {/* Constituency */}
        <div
          className="p-4 bg-gray-100 dark:bg-white/5 md:aspect-square border-none rounded-2xl py-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          onClick={() => setActiveSheet("constituency")}
        >
          <div className="flex flex-col items-center gap-3 text-center h-full">
            <div className="flex-grow flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Constituency</div>
              <div className="text-sm text-muted-foreground">
                {location.parliamentary_constituency}
              </div>
              {/* {mpData && (
                <div className="text-xs text-primary mt-1">
                  MP: {mpData.full_name}
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Region */}
        <div
          className="p-4 bg-gray-100 dark:bg-white/5 md:aspect-square border-none rounded-2xl py-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          onClick={() => setActiveSheet("region")}
        >
          <div className="flex flex-col items-center gap-3 text-center h-full">
            <div className="flex-grow flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Region</div>
              <div className="text-sm text-muted-foreground">
                {location.region}
              </div>
            </div>
          </div>
        </div>

        {weather && (
          <div className="col-span-2 sm:col-span-3">
            <WeatherCard
              weather={weather}
              location={location}
              className="bg-gray-100 dark:bg-white/5 border-none h-full text-foreground"
            />
          </div>
        )}

        {/* Second row with Map and Weather */}
        <div className="col-span-2 sm:col-span-1 h-64 sm:h-auto">
          <div className="h-full md:aspect-square max-w-full bg-gray-100 dark:bg-white/5 rounded-2xl overflow-hidden relative group">
            <StaticMap location={location} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 dark:bg-black/40 pointer-events-none">
              {/* <span className="text-sm font-medium h-12 w-12 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"> */}
              <Fullscreen size={30} />
              {/* </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Location Info Sheets */}
      {Object.entries(locationInfo).map(([key, info]) => (
        <LocationInfoSheet
          key={key}
          title={info.title}
          description={info.description}
          value={info.value}
          open={activeSheet === key}
          onOpenChange={(open) => setActiveSheet(open ? key : null)}
          mpData={key === "constituency" ? mpData : undefined}
          isConstituency={key === "constituency"}
        />
      ))}
    </div>
  );
}
