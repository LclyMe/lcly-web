import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lcly vs Nextdoor: The Better Alternative for UK Communities | Lcly",
  description:
    "Compare Lcly and Nextdoor to see why Lcly is the better choice for UK communities. Open-source, privacy-focused, community-owned alternative with local government integration.",
  keywords: [
    "Lcly vs Nextdoor",
    "Nextdoor alternative",
    "UK community platform",
    "open source Nextdoor",
    "privacy-focused community app",
    "Nextdoor UK alternative",
    "local community platform",
    "neighborhood app UK",
    "community-owned platform",
    "non-profit social network",
    "self-hostable community platform",
    "privacy-first social network",
    "open source community platform",
    "Nextdoor competitor",
    "better than Nextdoor",
    "Lcly features",
    "Nextdoor comparison",
    "local social network UK",
    "community app comparison",
    "UK neighborhood platform",
    "local government integration",
    "civic engagement platform",
    "local democracy app",
    "community council information",
    "MP activity tracker",
    "local elections information",
    "civic participation platform",
    "community decision making",
  ],
  alternates: {
    canonical: "https://lcly.org/vs-nextdoor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lcly vs Nextdoor: The Better Alternative for UK Communities",
    description:
      "Discover why Lcly is the better choice for UK communities with its open-source, privacy-focused approach and local government integration compared to Nextdoor.",
  },
};

export default function VsNextdoorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
