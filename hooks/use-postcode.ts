import { useCallback, useState, useEffect } from "react";
import { useDebounce } from "./use-debounce";
import { useQuery } from "@tanstack/react-query";
import { LocalPostcodeData, PostcodeData } from "@/types/location";

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
    return response.json() as Promise<PostcodeData>;
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
        `/api/postcode?postcode=${encodeURIComponent(postcode)}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Invalid postcode");
      }

      const data = await response.json();

      setPostcodeData(data);
      localStorage.setItem("postcodeData", JSON.stringify(data));

      return data;
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
