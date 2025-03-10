import { Database } from "@/types/database.types";
import { MPData } from "@/lib/server/mp";

export interface LocalPostcodeData {
  postcode: string;
  latitude: number;
  longitude: number;
  admin_district: string;
  region: string;
  country: string;
  parliamentary_constituency: string;
  admin_ward: string;
  mp_data?: MPData | null;
}

export type PostcodeData =
  Database["public"]["Tables"]["postcode_locations"]["Row"] & LocalPostcodeData;
