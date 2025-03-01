export interface PremiseAddress {
  PremiseID: number;
  Address1: string;
  Address2: string;
  Street: string;
  Locality: string;
  LocalAuthority: string;
  Town: string;
  Postcode: string;
  Latitude?: number;
  Longitude?: number;
}

export interface BinCollection {
  PremiseID: number;
  BinType: string;
  LocalAuthority: string;
  CollectionDate: string;
}

export interface BinMessage {
  RequestPostcode: string;
  LocalAuthority: string;
  MessageLink: string;
  MessageContentHTML: string;
  MessageBackgroundColour: string;
  MessageTextColour: string;
}

export interface GroupedCollection {
  date: string;
  collections: BinCollection[];
}

export interface BinsCardProps {
  postcode: string;
  postcodeLatitude?: number;
  postcodeLongitude?: number;
  className?: string;
  showComingSoonBanner?: boolean;
}
