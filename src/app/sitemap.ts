import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return [
    { url: new URL("/", site).href, changeFrequency: "monthly", priority: 1 },
    { url: new URL("/services", site).href, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map(({ slug }) => ({
      url: new URL(`/case-studies/${slug}`, site).href,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
