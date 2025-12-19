import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const routes = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/service-area",
    "/resources",
    "/contact",
    "/quote",
    "/faq",
    "/reviews",
    "/careers",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}

