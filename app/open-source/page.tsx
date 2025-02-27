import type { Metadata } from "next";
import { OpenSourcePageClient } from "./client";

// Define the structure for open source projects
interface OpenSourceProject {
  name: string;
  description: string;
  logo: string;
  website: string;
  github?: string;
  category: "UI" | "Data" | "Utilities" | "Framework" | "Visualization";
}

// List of open source projects used in the application
const projects: OpenSourceProject[] = [
  {
    name: "Next.js",
    description:
      "Powers our server-side rendering and routing system for fast, SEO-friendly pages.",
    logo: "/open-source/nextjs.svg",
    website: "https://nextjs.org/",
    github: "https://github.com/vercel/next.js",
    category: "Framework",
  },
  {
    name: "React",
    description:
      "Our UI foundation for building interactive components with a declarative approach.",
    logo: "/open-source/react.svg",
    website: "https://react.dev/",
    github: "https://github.com/facebook/react",
    category: "Framework",
  },
  {
    name: "Expo",
    description:
      "Enables our mobile app development with the same React codebase across platforms.",
    logo: "/open-source/expo.svg",
    website: "https://expo.dev/",
    github: "https://github.com/expo/expo",
    category: "Framework",
  },
  {
    name: "Tailwind CSS",
    description:
      "Provides our utility-first styling system for consistent and responsive UI design.",
    logo: "/open-source/tailwindcss.svg",
    website: "https://tailwindcss.com/",
    github: "https://github.com/tailwindlabs/tailwindcss",
    category: "UI",
  },
  {
    name: "Radix UI",
    description:
      "Supplies accessible UI primitives that we build upon for complex interactive components.",
    logo: "/open-source/radix.svg",
    website: "https://www.radix-ui.com/",
    github: "https://github.com/radix-ui/primitives",
    category: "UI",
  },
  {
    name: "Framer Motion",
    description:
      "Drives our animations and transitions for a more engaging user experience.",
    logo: "/open-source/framer-motion.svg",
    website: "https://www.framer.com/motion/",
    github: "https://github.com/framer/motion",
    category: "UI",
  },
  {
    name: "Lucide Icons",
    description:
      "Provides our consistent icon system throughout the application.",
    logo: "/open-source/lucide.svg",
    website: "https://lucide.dev/",
    github: "https://github.com/lucide-icons/lucide",
    category: "UI",
  },
  {
    name: "Leaflet",
    description:
      "Powers our interactive maps for location-based features and visualization.",
    logo: "/open-source/leaflet.svg",
    website: "https://leafletjs.com/",
    github: "https://github.com/Leaflet/Leaflet",
    category: "Visualization",
  },
  {
    name: "Supabase",
    description:
      "Handles our database, authentication, and storage needs with a PostgreSQL backend.",
    logo: "/open-source/supabase.svg",
    website: "https://supabase.com/",
    github: "https://github.com/supabase/supabase",
    category: "Data",
  },
  {
    name: "Zod",
    description:
      "Validates our data schemas and provides runtime type checking for safer code.",
    logo: "/open-source/zod.svg",
    website: "https://zod.dev/",
    github: "https://github.com/colinhacks/zod",
    category: "Utilities",
  },
  {
    name: "TanStack Query",
    description:
      "Handles data fetching, caching, and synchronization for a smoother user experience.",
    logo: "/open-source/tanstack.svg",
    website: "https://tanstack.com/query/latest",
    github: "https://github.com/TanStack/query",
    category: "Data",
  },
  {
    name: "date-fns",
    description:
      "Manages all our date formatting, parsing, and manipulation needs consistently.",
    logo: "/open-source/date-fns.svg",
    website: "https://date-fns.org/",
    github: "https://github.com/date-fns/date-fns",
    category: "Utilities",
  },
  {
    name: "Postcodes.io",
    description:
      "Powers our UK postcode lookup and location services for community mapping.",
    logo: "/open-source/postcodes-io.svg",
    website: "https://postcodes.io/",
    github: "https://github.com/ideal-postcodes/postcodes.io",
    category: "Data",
  },
  {
    name: "TheyWorkForUs",
    description:
      "Integrates local representative data to connect communities with their elected officials.",
    logo: "/open-source/theyworkforus.png",
    website: "https://www.theyworkforyou.com/",
    github: "https://github.com/mysociety/theyworkforyou",
    category: "Data",
  },
  {
    name: "shadcn/ui",
    description:
      "Provides our beautifully designed, accessible component system built on Radix UI.",
    logo: "/open-source/shadcn.svg",
    website: "https://ui.shadcn.com/",
    github: "https://github.com/shadcn/ui",
    category: "UI",
  },
];

// Group projects by category
const groupedProjects = projects.reduce((acc, project) => {
  if (!acc[project.category]) {
    acc[project.category] = [];
  }
  acc[project.category].push(project);
  return acc;
}, {} as Record<string, OpenSourceProject[]>);

// Order of categories to display
const categoryOrder = ["Framework", "UI", "Data", "Visualization", "Utilities"];

export const metadata: Metadata = {
  title: "Open Source Stack | Lcly",
  description:
    "Discover the open source technologies powering the Lcly community platform. From the libraries powering the website to the local information powering the app.",
  keywords: [
    "open source",
    "Lcly tech stack",
    "React",
    "Next.js",
    "Supabase",
    "Tailwind CSS",
    "UK community platform",
    "shadcn/ui",
    "Postcodes.io",
    "TheyWorkForUs",
    "Lcly",
  ],
  openGraph: {
    title: "Lcly's Open Source Technology Stack",
    description:
      "Explore the open source technologies that power Lcly's community platform for the UK.",
    url: "https://www.lcly.me/open-source",
    siteName: "Lcly",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lcly's Open Source Technology Stack",
    description:
      "Explore the open source technologies that power Lcly's community platform for the UK.",
    creator: "@lclyme",
    site: "@lclyme",
  },
  alternates: {
    canonical: "https://www.lcly.me/open-source",
  },
};

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <OpenSourcePageClient
          projects={projects}
          groupedProjects={groupedProjects}
          categoryOrder={categoryOrder}
        />
      </div>
    </div>
  );
}
