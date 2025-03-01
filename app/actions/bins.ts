"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

// export async function updateBinPreference(
//   userId: string,
//   postcode: string,
//   address: PremiseAddress
// ) {
//   const supabase = await createClient();

//   await supabase.from("user_bin_preferences").upsert({
//     user_id: userId,
//     postcode: postcode,
//     premise_id: address.PremiseID,
//     local_authority: address.LocalAuthority,
//     address_json: address as any, // Type assertion needed due to Json type
//   });

//   revalidatePath(`/`);
// }

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
        next: { revalidate: 3600 }, // Cache for 1 hour
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

// export async function selectAddress(
//   userId: string | undefined,
//   postcode: string,
//   address: PremiseAddress
// ) {
//   // Save user preference if logged in
//   if (userId) {
//     await updateBinPreference(userId, postcode, address);
//   }

//   // Fetch collections for this address
//   const collections = await fetchCollections(
//     address.PremiseID,
//     address.LocalAuthority
//   );

//   revalidatePath(`/`);

//   return { collections };
// }
