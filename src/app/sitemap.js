export default function sitemap() {
  const baseUrl = "https://www.galileo.finance";
  const now = new Date();
  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
} 