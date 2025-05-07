import { MPRecord } from "@/lib/server/mp";
import { Database } from "@/types/database.types";

export interface ExtraInformation {
  primary_care_trust?: string;
  ccg?: string;
  admin_county?: string;
  parish?: string;
  pfa?: string;
  ced?: string;
  [key: string]: any;
}

type PostcodeRow = Database["public"]["Tables"]["postcode_locations"]["Row"];

export type PostcodeData = PostcodeRow & {
  extra_information?: ExtraInformation;
  mp_data?: MPRecord | null;
  councillors?:
    | Database["public"]["Views"]["current_councillors"]["Row"][]
    | null;
  ced_councillors?:
    | Database["public"]["Views"]["current_councillors"]["Row"][]
    | null;
};
