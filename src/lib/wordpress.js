const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://galieloblog.aurigital.com/wp-json/wp/v2';

export async function getPosts(lang = null, per_page = 10, page = 1) {
  try {
    const fetchPerPage = lang ? 100 : per_page;
    const fetchPage = lang ? 1 : page;

    let url = `${WORDPRESS_API_URL}/posts?_embed&per_page=${fetchPerPage}&page=${fetchPage}`;
    if (lang) url += `&lang=${lang}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);

    let posts = await res.json();

    if (lang && posts.length > 0) {
      const catRes = await fetch(`${WORDPRESS_API_URL}/categories?lang=${lang}&per_page=100`, {
        next: { revalidate: 3600 }
      });
      if (catRes.ok) {
        const langCategories = await catRes.json();
        const validCategoryIds = new Set(langCategories.map(cat => cat.id));
        posts = posts.filter(post =>
          post.categories?.some(catId => validCategoryIds.has(catId))
        );
      }
    }

    let totalPosts = posts.length;
    let totalPages = Math.ceil(totalPosts / per_page) || 1;
    let paginatedPosts = posts;

    if (lang) {
      const startIndex = (page - 1) * per_page;
      paginatedPosts = posts.slice(startIndex, startIndex + per_page);
    } else {
      totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
      totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');
    }

    return {
      posts: paginatedPosts,
      pagination: { total: totalPosts, totalPages, currentPage: page, perPage: per_page }
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], pagination: { total: 0, totalPages: 0, currentPage: 1, perPage: per_page } };
  }
}

export async function getPostBySlug(slug, lang = null) {
  try {
    let url = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
    if (lang) url += `&lang=${lang}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);

    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getAllPostSlugs() {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/posts?per_page=100&_fields=slug`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error(`Failed to fetch slugs: ${res.status}`);

    const posts = await res.json();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

export async function getCategories(lang = null) {
  try {
    let url = `${WORDPRESS_API_URL}/categories?per_page=100`;
    if (lang) url += `&lang=${lang}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);

    const categories = await res.json();
    const categoriesMap = {};
    categories.forEach(cat => { categoriesMap[cat.slug] = cat.id; });

    return { categories, categoriesMap };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { categories: [], categoriesMap: {} };
  }
}

export async function getPostsAdvanced(options = {}) {
  const { page = 1, perPage = 10, categories = [], search = '', orderBy = 'date', lang = null } = options;

  try {
    const fetchPerPage = lang ? 100 : perPage;
    const fetchPage = lang ? 1 : page;

    let url = `${WORDPRESS_API_URL}/posts?_embed&per_page=${fetchPerPage}&page=${fetchPage}`;
    if (categories.length > 0) url += `&categories=${categories.join(',')}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (orderBy === 'title-asc') url += '&orderby=title&order=asc';
    else if (orderBy === 'title-desc') url += '&orderby=title&order=desc';
    else url += '&orderby=date&order=desc';
    if (lang) url += `&lang=${lang}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);

    let posts = await res.json();

    if (lang && posts.length > 0) {
      const catRes = await fetch(`${WORDPRESS_API_URL}/categories?lang=${lang}&per_page=100`, {
        cache: 'no-store'
      });
      if (catRes.ok) {
        const langCategories = await catRes.json();
        const validCategoryIds = new Set(langCategories.map(cat => cat.id));
        posts = posts.filter(post =>
          post.categories?.some(catId => validCategoryIds.has(catId))
        );
      }
    }

    let totalItems = posts.length;
    let totalPages = Math.ceil(totalItems / perPage) || 1;
    let paginatedPosts = posts;

    if (lang) {
      const startIndex = (page - 1) * perPage;
      paginatedPosts = posts.slice(startIndex, startIndex + perPage);
    } else {
      totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
      totalItems = parseInt(res.headers.get('X-WP-Total') || '0');
    }

    return { posts: paginatedPosts, totalPages, totalItems };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 0, totalItems: 0 };
  }
}

export function getFeaturedImage(post) {
  if (post._embedded?.['wp:featuredmedia']) {
    return post._embedded['wp:featuredmedia'][0]?.source_url || null;
  }
  return null;
}

export function getAuthorName(post) {
  return post._embedded?.author?.[0]?.name || 'Unknown';
}

export function formatDate(dateString, locale = 'es') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getCategory(post) {
  const categories = post._embedded?.['wp:term']?.[0];
  return categories?.[0]?.name || 'General';
}

export async function getRelatedPosts(categoryId, excludeId, limit = 3, lang = null) {
  try {
    let url = `${WORDPRESS_API_URL}/posts?_embed&categories=${categoryId}&exclude=${excludeId}&per_page=${limit}&orderby=date&order=desc`;
    if (lang) url += `&lang=${lang}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch related posts: ${res.status}`);

    let posts = await res.json();

    if (lang && posts.length > 0) {
      const catRes = await fetch(`${WORDPRESS_API_URL}/categories?lang=${lang}&per_page=100`, {
        next: { revalidate: 3600 }
      });
      if (catRes.ok) {
        const langCategories = await catRes.json();
        const validCategoryIds = new Set(langCategories.map(cat => cat.id));
        posts = posts.filter(post =>
          post.categories?.some(catId => validCategoryIds.has(catId))
        );
      }
    }

    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export function cleanHtml(html) {
  if (!html) return '';
  let text = html.replace(/<\/?[^>]+(>|$)/g, '');
  const entities = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'",
    '&nbsp;': ' ', '&#8217;': "'", '&#8216;': "'", '&#8220;': '"',
    '&#8221;': '"', '&#8211;': '–', '&#8212;': '—'
  };
  Object.keys(entities).forEach(entity => {
    text = text.replace(new RegExp(entity, 'g'), entities[entity]);
  });
  return text.trim();
}
