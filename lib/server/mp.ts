export interface MPOffice {
  moffice_id: string;
  dept: string;
  position: string;
  from_date: string;
  to_date: string;
  person: string;
  source: string;
}

export interface MPData {
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

export async function getMP(constituency: string): Promise<MPData> {
  const API_KEY = "GiatNDCM9jXNC5EkfuCZkvVk";
  const response = await fetch(
    `https://www.theyworkforyou.com/api/getMP?constituency=${encodeURIComponent(
      constituency
    )}&output=json&key=${API_KEY}`,
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );

  if (!response.ok) {
    throw new Error("Failed to fetch MP data");
  }

  const data = await response.json();
  return data;
}
