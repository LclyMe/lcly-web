import { MPRecord } from "@/lib/server/mp";
import { Database } from "@/types/database.types";

export type ExtraInformation = {
  primary_care_trust?: string | null;
  ccg?: string | null;
  admin_county?: string | null;
  parish?: string | null;
  [key: string]: any;
} | null;

type PostcodeRow = Database["public"]["Tables"]["postcode_locations"]["Row"];

export type PostcodeData = PostcodeRow & {
  extra_information?: ExtraInformation;
  mp_data?: MPRecord | null;
};
