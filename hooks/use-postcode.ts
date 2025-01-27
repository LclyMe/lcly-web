import { useCallback, useState, useEffect } from "react";
import { useDebounce } from "./use-debounce";
import { useQuery } from "@tanstack/react-query";
import { PostcodeLocation } from "@/lib/client/postcode";
import { LocalPostcodeData } from "@/types/location";

export function usePostcode(initialPostcode?: string) {
  const [error, setError] = useState<string>();
  const debouncedPostcode = useDebounce(initialPostcode, 500);

  // For storing local data
  const [postcodeData, setPostcodeData] = useState<LocalPostcodeData | null>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("postcodeData");
        return saved ? JSON.parse(saved) : null;
      }
      return null;
    }
  );

  // Real-time validation
  const validatePostcode = useCallback(async (postcode: string) => {
    const response = await fetch(
      `/api/postcode?postcode=${encodeURIComponent(postcode)}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to validate postcode");
    }
    return response.json() as Promise<PostcodeLocation>;
  }, []);

  const query = useQuery({
    queryKey: ["postcode", debouncedPostcode],
    queryFn: () => validatePostcode(debouncedPostcode || ""),
    enabled: !!debouncedPostcode,
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Handle validation errors in an effect
  useEffect(() => {
    if (query.error instanceof Error) {
      setError(query.error.message);
    } else if (query.data) {
      setError(undefined);
    }
  }, [query.error, query.data]);

  // Full postcode info fetching
  const getPostcodeInfo = async (postcode: string) => {
    try {
      setError(undefined);
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

      const newPostcodeData: LocalPostcodeData = {
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

      return newPostcodeData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch postcode data";
      setError(errorMessage);
      throw err;
    }
  };

  const clearPostcode = () => {
    setPostcodeData(null);
    localStorage.removeItem("postcodeData");
  };

  return {
    // Real-time validation results
    location: query.data,
    isLoading: query.isLoading,
    error,
    isValid: !!query.data && !error,

    // Stored postcode data
    postcodeData,

    // Actions
    getPostcodeInfo,
    clearPostcode,
  };
}
