import { getPages } from "@/app/utils/utils";
import { baseURL, routes } from "@/resources";

export default async function sitemap() {
  const pages = getPages(["src", "content"]).map((post) => ({
    url: `${baseURL}/${post.slug}`,
    lastModified: post.metadata.updatedAt,
  }));

  // The home page plus the enabled top-level routes (changelog, roadmap).
  const today = new Date().toISOString().split("T")[0];
  const staticRoutes = ["", ...Object.keys(routes).filter((route) => routes[route as keyof typeof routes])].map(
    (route) => ({
      url: `${baseURL}${route}`,
      lastModified: today,
    }),
  );

  return [...staticRoutes, ...pages];
}
