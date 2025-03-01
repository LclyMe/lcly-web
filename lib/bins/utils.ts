import { format, parseISO, isBefore, addDays } from "date-fns";
import type { PremiseAddress, BinCollection, GroupedCollection } from "./types";

export const formatAddress = (address: PremiseAddress) => {
  // Clean and filter out empty or null values
  const parts = [
    address.Address1?.trim(),
    address.Address2?.trim(),
    address.Street?.trim() || "",
    address.Locality?.trim() || "",
    address.Town?.trim() || "",
    address.Postcode?.trim() || "",
  ].filter((part) => part !== "" && part !== "\u0000");

  return parts.join(", ");
};

export const formatHouseName = (address: PremiseAddress) => {
  return address.Address1?.trim() || "";
};

export const getBinColor = (binType: string) => {
  switch (binType.toUpperCase()) {
    case "GREEN":
      return "bg-green-600";
    case "BLACK":
      return "bg-gray-800";
    case "BROWN":
      return "bg-amber-800";
    case "BLUE":
      return "bg-blue-600";
    case "GREY":
      return "bg-gray-500";
    case "PINK":
      return "bg-pink-500";
    case "PURPLE":
      return "bg-purple-600";
    case "RED":
      return "bg-red-600";
    case "ORANGE":
      return "bg-orange-500";
    case "YELLOW":
      return "bg-yellow-500";
    default:
      // If the bin type is not recognized, try to match it to a color
      if (binType.toUpperCase().includes("GREEN")) return "bg-green-600";
      if (binType.toUpperCase().includes("BLACK")) return "bg-gray-800";
      if (binType.toUpperCase().includes("BROWN")) return "bg-amber-800";
      if (binType.toUpperCase().includes("BLUE")) return "bg-blue-600";
      if (binType.toUpperCase().includes("GREY")) return "bg-gray-500";
      if (binType.toUpperCase().includes("GRAY")) return "bg-gray-500";
      if (binType.toUpperCase().includes("PINK")) return "bg-pink-500";
      if (binType.toUpperCase().includes("PURPLE")) return "bg-purple-600";
      if (binType.toUpperCase().includes("RED")) return "bg-red-600";
      if (binType.toUpperCase().includes("ORANGE")) return "bg-orange-500";
      if (binType.toUpperCase().includes("YELLOW")) return "bg-yellow-500";
      return "bg-primary";
  }
};

export const getNextCollection = (collections: BinCollection[]) => {
  if (!collections.length) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Sort collections by date
  const sortedCollections = [...collections].sort(
    (a, b) =>
      new Date(a.CollectionDate).getTime() -
      new Date(b.CollectionDate).getTime()
  );

  // Find the next collection (today or future)
  return (
    sortedCollections.find((collection) => {
      const collectionDate = parseISO(collection.CollectionDate);
      return (
        !isBefore(collectionDate, today) ||
        collectionDate.getTime() === today.getTime()
      );
    }) || sortedCollections[0]
  );
};

export const getUpcomingCollections = (collections: BinCollection[]) => {
  if (!collections.length) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get collections for the next 6 weeks
  const sixWeeksLater = addDays(today, 42);

  // Get the next collection to exclude it from upcoming
  const nextCollectionItem = getNextCollection(collections);
  const nextCollectionDate = nextCollectionItem?.CollectionDate;

  return collections
    .filter((collection) => {
      const collectionDate = parseISO(collection.CollectionDate);
      return (
        !isBefore(collectionDate, today) &&
        isBefore(collectionDate, sixWeeksLater) &&
        (nextCollectionDate
          ? collection.CollectionDate !== nextCollectionDate
          : true)
      );
    })
    .sort(
      (a, b) =>
        new Date(a.CollectionDate).getTime() -
        new Date(b.CollectionDate).getTime()
    );
};

export const groupCollectionsByDate = (
  collections: BinCollection[]
): GroupedCollection[] => {
  const grouped: Record<string, BinCollection[]> = {};

  collections.forEach((collection) => {
    if (!grouped[collection.CollectionDate]) {
      grouped[collection.CollectionDate] = [];
    }
    grouped[collection.CollectionDate].push(collection);
  });

  return Object.entries(grouped).map(([date, collections]) => ({
    date,
    collections,
  }));
};
