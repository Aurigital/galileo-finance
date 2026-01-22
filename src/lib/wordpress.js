/**
 * WordPress Headless API Utilities
 *
 * This file contains all functions to fetch data from the WordPress REST API.
 * All fetches are done server-side (no CORS issues).
 *
 * Polylang Integration:
 * - Once Polylang is installed, posts will have a 'lang' field
 * - You can filter posts by language using ?lang=es or ?lang=en
 */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://galieloblog.aurigital.com/wp-json/wp/v2';

/**
 * Fetch all posts from WordPress
 * @param {string} lang - Language code (es, en) - works after Polylang is installed
 * @param {number} per_page - Number of posts per page (default: 10)
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Array>} Array of posts
 */
export async function getPosts(lang = null, per_page = 10, page = 1) {
  try {
    let url = `${WORDPRESS_API_URL}/posts?_embed&per_page=${per_page}&page=${page}`;

    // Add language filter when Polylang is configured
    if (lang) {
      url += `&lang=${lang}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour (ISR)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const posts = await res.json();

    // Get total pages from headers for pagination
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
    const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');

    return {
      posts,
      pagination: {
        total: totalPosts,
        totalPages,
        currentPage: page,
        perPage: per_page
      }
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        perPage: per_page
      }
    };
  }
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @param {string} lang - Language code (optional, for Polylang)
 * @returns {Promise<Object|null>} Post object or null
 */
export async function getPostBySlug(slug, lang = null) {
  try {
    let url = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;

    if (lang) {
      url += `&lang=${lang}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Fetch all post slugs for static generation
 * @returns {Promise<Array>} Array of slugs
 */
export async function getAllPostSlugs() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/posts?per_page=100&_fields=slug`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch slugs: ${res.status}`);
    }

    const posts = await res.json();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Fetch categories
 * @param {string} lang - Language code (optional)
 * @returns {Promise<Array>} Array of categories
 */
export async function getCategories(lang = null) {
  try {
    let url = `${WORDPRESS_API_URL}/categories`;

    if (lang) {
      url += `?lang=${lang}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get featured image URL from post
 * @param {Object} post - Post object
 * @returns {string|null} Image URL or null
 */
export function getFeaturedImage(post) {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    const media = post._embedded['wp:featuredmedia'][0];
    return media.source_url || null;
  }
  return null;
}

/**
 * Get author name from post
 * @param {Object} post - Post object
 * @returns {string} Author name
 */
export function getAuthorName(post) {
  if (post._embedded && post._embedded.author) {
    return post._embedded.author[0].name || 'Unknown';
  }
  return 'Unknown';
}

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @param {string} locale - Locale (es, en)
 * @returns {string} Formatted date
 */
export function formatDate(dateString, locale = 'es') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
