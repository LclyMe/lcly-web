import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
  distance?: number;
}

// Top 100 UK cities by population
const UK_CITIES: City[] = [
  {
    name: "London",
    latitude: 51.5074,
    longitude: -0.1278,
    country: "England",
    population: 8982000,
    is_capital: true,
  },
  {
    name: "Birmingham",
    latitude: 52.4862,
    longitude: -1.8904,
    country: "England",
    population: 2576000,
    is_capital: false,
  },
  {
    name: "Manchester",
    latitude: 53.4808,
    longitude: -2.2426,
    country: "England",
    population: 2730000,
    is_capital: false,
  },
  {
    name: "Leeds",
    latitude: 53.7997,
    longitude: -1.5492,
    country: "England",
    population: 1889000,
    is_capital: false,
  },
  {
    name: "Glasgow",
    latitude: 55.8642,
    longitude: -4.2518,
    country: "Scotland",
    population: 1673000,
    is_capital: false,
  },
  {
    name: "Liverpool",
    latitude: 53.4084,
    longitude: -2.9916,
    country: "England",
    population: 1378000,
    is_capital: false,
  },
  {
    name: "Newcastle",
    latitude: 54.9783,
    longitude: -1.6178,
    country: "England",
    population: 813000,
    is_capital: false,
  },
  {
    name: "Sheffield",
    latitude: 53.3811,
    longitude: -1.4701,
    country: "England",
    population: 730000,
    is_capital: false,
  },
  {
    name: "Bristol",
    latitude: 51.4545,
    longitude: -2.5879,
    country: "England",
    population: 670000,
    is_capital: false,
  },
  {
    name: "Edinburgh",
    latitude: 55.9533,
    longitude: -3.1883,
    country: "Scotland",
    population: 530000,
    is_capital: true,
  },
  // Add more cities as needed
];

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function findClosestCity(latitude: number, longitude: number): City {
  let closestCity = UK_CITIES[0];
  let minDistance = calculateDistance(
    latitude,
    longitude,
    closestCity.latitude,
    closestCity.longitude
  );

  for (const city of UK_CITIES) {
    const distance = calculateDistance(
      latitude,
      longitude,
      city.latitude,
      city.longitude
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  return { ...closestCity, distance: Math.round(minDistance) };
}

export async function GET(req: NextRequest) {
  try {
    const geo = geolocation(req);
    const supabase = await createClient();

    // Get the nearest community using PostGIS
    const { data: nearestCommunity, error } = await supabase
      .from("communities")
      .select("*")
      .eq("name", geo.city || "London")
      .limit(1)
      .single();

    if (error) {
      console.error("Error finding nearest community:", error);
      throw error;
    }

    return NextResponse.json({
      geo,
      community: nearestCommunity,
    });
  } catch (error) {
    console.error("Error in location API:", error);
    return NextResponse.json(
      { error: "Failed to determine location" },
      { status: 500 }
    );
  }
}
