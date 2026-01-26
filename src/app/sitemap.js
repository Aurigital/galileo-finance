import { getAllPostSlugs } from '../lib/wordpress';

export default async function sitemap() {
  const baseUrl = "https://www.galileo.finance";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  let blogPosts = [];
  try {
    const slugs = await getAllPostSlugs();
    blogPosts = slugs.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticPages, ...blogPosts];
}
