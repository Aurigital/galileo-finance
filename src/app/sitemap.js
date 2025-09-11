export default function sitemap() {
  const baseUrl = "https://galileocapital.io";
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