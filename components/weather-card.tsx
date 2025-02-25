"use client";

import { Cloud, Thermometer, Wind, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import { weatherCodes } from "@/lib/utils/weather";
import { PostcodeData } from "@/types/location";

interface WeatherData {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  weather_code: number;
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

interface WeatherCardProps {
  weather: WeatherData;
  location?: PostcodeData;
  className?: string;
  variant?: "default" | "detailed";
}

export function WeatherCard({
  weather,
  location,
  className,
  variant = "default",
}: WeatherCardProps) {
  // If we have hourly data and it's the default variant, show the home-style card
  if (weather.hourly && variant === "default") {
    return (
      <div
        className={cn(
          "p-6 rounded-3xl bg-black text-white dark:bg-black/90 border border-border/50",
          "backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <div className="flex flex-col gap-4">
          {/* Current Weather */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {weatherCodes[weather.weather_code]?.icon || "🌦️"}
              </div>
              <div>
                <div className="text-4xl font-semibold">
                  {Math.round(weather.temperature_2m)}°
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl">
                {weatherCodes[weather.weather_code]?.label || "Weather"}
              </div>
              {location && (
                <div className="text-gray-400">
                  {location.admin_ward || "Unknown"}
                </div>
              )}
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="flex justify-between">
            {[...Array(6)].map((_, i) => {
              const hour = new Date().getHours() + i + 1;
              const displayHour = hour % 24;
              const hourly = weather.hourly!;
              const hourIndex = i < hourly.time.length ? i : 0;

              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-sm text-gray-400">
                    {displayHour === 12
                      ? "12 PM"
                      : displayHour === 0
                      ? "12 AM"
                      : displayHour > 12
                      ? `${displayHour - 12} PM`
                      : `${displayHour} AM`}
                  </div>
                  <div className="text-2xl">
                    {weatherCodes[hourly.weather_code[hourIndex]]?.icon || "🌦️"}
                  </div>
                  <div className="text-sm">
                    {Math.round(hourly.temperature_2m[hourIndex])}°
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // For the detailed variant or when no hourly data is available
  return (
    <div className={cn("p-6 rounded-2xl", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Temperature and Condition */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-5xl mb-4">
            {weatherCodes[weather.weather_code]?.icon || "🌦️"}
          </span>
          <p className="text-5xl font-bold mb-2">
            {Math.round(weather.temperature_2m)}°C
          </p>
          <p className="text-muted-foreground capitalize">
            {weatherCodes[weather.weather_code]?.label || "Unknown"}
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-3">
            <Thermometer className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground whitespace-nowrap">
              Feels like:{" "}
              <span className="font-medium text-foreground">
                {Math.round(weather.apparent_temperature)}°C
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground whitespace-nowrap">
              Wind:{" "}
              <span className="font-medium text-foreground">
                {Math.round(weather.wind_speed_10m)} km/h
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground whitespace-nowrap">
              Humidity:{" "}
              <span className="font-medium text-foreground">
                {weather.relative_humidity_2m}%
              </span>
            </span>
          </div>
        </div>

        {/* Precipitation */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-muted-foreground mb-2">Precipitation</p>
          <p className="text-2xl font-medium">{weather.precipitation} mm</p>
        </div>
      </div>
    </div>
  );
}
