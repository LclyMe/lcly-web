import { useQuery } from "@tanstack/react-query";

interface MPOffice {
  moffice_id: string;
  dept: string;
  position: string;
  from_date: string;
  to_date: string;
  person: string;
  source: string;
}

interface MPData {
  member_id: string;
  house: string;
  constituency: string;
  party: string;
  entered_house: string;
  left_house: string;
  entered_reason: string;
  left_reason: string;
  person_id: string;
  lastupdate: string;
  title: string;
  given_name: string;
  family_name: string;
  full_name: string;
  url: string;
  image: string;
  image_height: number;
  image_width: number;
  office: MPOffice[];
}

async function getMP(constituency: string): Promise<MPData> {
  const API_KEY = "GiatNDCM9jXNC5EkfuCZkvVk";
  const response = await fetch(
    `https://www.theyworkforyou.com/api/getMP?constituency=${encodeURIComponent(
      constituency
    )}&output=json&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch MP data");
  }

  const data = await response.json();
  return data;
}

export function useMPQuery(constituency: string | undefined) {
  return useQuery({
    queryKey: ["mp", constituency],
    queryFn: () => getMP(constituency!),
    enabled: !!constituency,
    staleTime: 1000 * 60 * 60 * 24, // Consider data stale after 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep in cache for 7 days
  });
}
