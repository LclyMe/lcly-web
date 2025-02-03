import { getPostcodeLocation } from "@/lib/server/postcode";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Navigation,
  Building,
  Globe,
  Cloud,
  Thermometer,
  Wind,
  Droplets,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getWeather } from "@/lib/utils/weather";

interface PostcodePageProps {
  params: Promise<{
    postcode: string;
  }>;
}

// Convert weather code to description
function getWeatherDescription(code: number): string {
  const weatherCodes: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return weatherCodes[code] || "Unknown";
}

// Convert weather code to emoji
function getWeatherEmoji(code: number): string {
  const weatherEmojis: { [key: number]: string } = {
    0: "☀️", // Clear sky
    1: "🌤️", // Mainly clear
    2: "⛅️", // Partly cloudy
    3: "☁️", // Overcast
    45: "🌫️", // Foggy
    48: "🌫️", // Depositing rime fog
    51: "🌧️", // Light drizzle
    53: "🌧️", // Moderate drizzle
    55: "🌧️", // Dense drizzle
    56: "🌧️", // Light freezing drizzle
    57: "🌧️", // Dense freezing drizzle
    61: "🌧️", // Slight rain
    63: "🌧️", // Moderate rain
    65: "🌧️", // Heavy rain
    66: "🌨️", // Light freezing rain
    67: "🌨️", // Heavy freezing rain
    71: "🌨️", // Slight snow fall
    73: "🌨️", // Moderate snow fall
    75: "🌨️", // Heavy snow fall
    77: "🌨️", // Snow grains
    80: "🌦️", // Slight rain showers
    81: "🌦️", // Moderate rain showers
    82: "🌦️", // Violent rain showers
    85: "🌨️", // Slight snow showers
    86: "🌨️", // Heavy snow showers
    95: "⛈️", // Thunderstorm
    96: "⛈️", // Thunderstorm with slight hail
    99: "⛈️", // Thunderstorm with heavy hail
  };
  return weatherEmojis[code] || "❓";
}

export default async function PostcodePage({ params }: PostcodePageProps) {
  const { postcode } = await params;
  const decodedPostcode = decodeURIComponent(postcode);
  const location = await getPostcodeLocation(decodedPostcode);
  const weather = await getWeather(location.latitude, location.longitude, true);

  return (
    <div className="relative container mx-auto px-6 h-full min-h-[80vh] flex flex-col items-center justify-center">
      {/* Back Button */}
      <div className="absolute left-4 top-8 z-10">
        <Link href="/">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center pb-6 pt-16">
        {/* Postcode Info */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Postocode
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
          <Link
            href={`/map?postcode=${encodeURIComponent(location.postcode)}`}
            className="h-full"
          >
            <div className="h-full p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <div className="flex flex-col items-center gap-2 text-center h-full">
                <div className="flex-grow flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">View on Map</div>
                  <div className="text-xs text-muted-foreground">
                    {location.latitude.toFixed(4)},{" "}
                    {location.longitude.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center h-full">
              <div className="flex-grow flex items-center justify-center">
                <Navigation className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">
                  {location.admin_district}
                </div>
                <div className="text-xs text-muted-foreground">District</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center h-full">
              <div className="flex-grow flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">
                  {location.region || location.parliamentary_constituency}
                </div>
                <div className="text-xs text-muted-foreground">Region</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-5">
            <div className="flex flex-col items-center gap-2 text-center h-full">
              <div className="flex-grow flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">{location.country}</div>
                <div className="text-xs text-muted-foreground">Country</div>
              </div>
            </div>
          </div>

          {weather && (
            <div className="p-6 px-8 bg-gray-100 dark:bg-white/5 border-none rounded-2xl col-span-2 sm:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Temperature and Condition */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-5xl mb-4">
                    {getWeatherEmoji(weather.weather_code)}
                  </span>
                  <p className="text-5xl font-bold mb-2">
                    {Math.round(weather.temperature_2m)}°C
                  </p>
                  <p className="text-muted-foreground capitalize">
                    {getWeatherDescription(weather.weather_code)}
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
                  <p className="text-2xl font-medium">
                    {weather.precipitation} mm
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
