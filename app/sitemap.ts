import type { MetadataRoute } from "next";

const SITE_URL = "https://ramatc.vercel.app";

// Only real routes: search engines ignore #fragments, so section anchors
// would all collapse into the home URL.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/proyectos/coda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/proyectos/vame`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
