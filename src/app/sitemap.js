// Next.js App Router dynamic sitemap
// See: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#sitemaptxt

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes (homepage only for now). Add more routes as needed.
  const routes = [
    "",
  ].map((path) => ({
    url: `${siteUrl}/${path}`.replace(/\/$/, "/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  return routes;
}
