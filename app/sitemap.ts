import { MetadataRoute } from "next";

const baseUrl = "https://www.lcly.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/local`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/vs-nextdoor`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/communities`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/thoughts/public`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/whitepaper`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "monthly",
    },
    // Dynamic routes like /c/[slug], /u/[username], and /thoughts/public/[id]
    // will be generated at request time or through generateStaticParams
  ];
}
