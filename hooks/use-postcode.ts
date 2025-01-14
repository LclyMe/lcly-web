import { useState, useEffect } from "react";

export type Location = {
  latitude: number;
  longitude: number;
  name: string;
};

export type PostcodeData = {
  postcode: string;
  latitude: number;
  longitude: number;
  admin_district: string;
  region: string;
  country: string;
  parliamentary_constituency: string;
  admin_ward: string;
};

export function usePostcode() {
  const [postcodeData, setPostcodeData] = useState<PostcodeData | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("postcodeData");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [savedLocation, setSavedLocation] = useState<Location | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedLocation");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPostcodeInfo = async (postcode: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );

      if (!response.ok) {
        throw new Error("Invalid postcode");
      }

      const data = await response.json();

      if (!data.result) {
        throw new Error("Postcode not found");
      }

      const newPostcodeData: PostcodeData = {
        postcode: data.result.postcode,
        latitude: data.result.latitude,
        longitude: data.result.longitude,
        admin_district: data.result.admin_district,
        region: data.result.region,
        country: data.result.country,
        parliamentary_constituency: data.result.parliamentary_constituency,
        admin_ward: data.result.admin_ward,
      };

      setPostcodeData(newPostcodeData);
      localStorage.setItem("postcodeData", JSON.stringify(newPostcodeData));

      const newLocation: Location = {
        latitude: data.result.latitude,
        longitude: data.result.longitude,
        name: data.result.admin_ward || data.result.admin_district,
      };
      setSavedLocation(newLocation);
      localStorage.setItem("savedLocation", JSON.stringify(newLocation));

      return newPostcodeData;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch postcode data"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearPostcode = () => {
    setPostcodeData(null);
    setSavedLocation(null);
    localStorage.removeItem("postcodeData");
    localStorage.removeItem("savedLocation");
  };

  return {
    postcodeData,
    savedLocation,
    isLoading,
    error,
    getPostcodeInfo,
    clearPostcode,
  };
}
