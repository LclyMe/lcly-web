"use server";

export interface PremiseAddress {
  PremiseID: number;
  Address1: string;
  Address2: string;
  Street: string;
  Locality: string;
  LocalAuthority: string;
  Town: string;
  Postcode: string;
}

export interface BinCollection {
  PremiseID: number;
  BinType: string;
  LocalAuthority: string;
  CollectionDate: string;
}

export async function fetchCollections(
  premiseId: number,
  localAuthority: string
): Promise<BinCollection[]> {
  try {
    const response = await fetch(
      `https://bins.azurewebsites.net/api/getcollections?premisesid=${premiseId}&localauthority=${encodeURIComponent(
        localAuthority
      )}`,
      {
        headers: {
          accept: "*/*",
        },
        next: { revalidate: 86400 }, // Cache for 1 day
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching collections:", err);
    return [];
  }
}
