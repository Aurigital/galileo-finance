import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getFeaturedImage, formatDate } from '@/lib/wordpress';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/Footer';

/**
 * Blog Listing Page - Server Component
 *
 * This page fetches posts from WordPress REST API server-side (no CORS issues).
 * It's a Server Component by default in Next.js 14 App Router.
 *
 * TODO for frontend developer:
 * - Style this page according to Galileo's design system
 * - Add pagination component
 * - Add category filters
 * - Add search functionality
 * - Integrate with i18n for language switching
 * - Add animations (AOS) if needed
 */

export const metadata = {
  title: 'Blog',
  description: 'Lee los últimos artículos de Galileo',
};

export default async function BlogPage({ searchParams }) {
  // Get language from URL params (once i18n is integrated)
  const lang = searchParams.lang || null;
  const page = parseInt(searchParams.page) || 1;

  // Fetch posts from WordPress
  const { posts, pagination } = await getPosts(lang, 9, page);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600">
              Últimos artículos y noticias de Galileo
            </p>
          </header>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => {
                  const featuredImage = getFeaturedImage(post);

                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Featured Image */}
                      {featuredImage ? (
                        <Link href={`/blog/${post.slug}`}>
                          <div className="relative h-48 bg-gray-200">
                            <Image
                              src={featuredImage}
                              alt={post.title.rendered}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                      ) : (
                        <Link href={`/blog/${post.slug}`}>
                          <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">
                              Galileo
                            </span>
                          </div>
                        </Link>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Date */}
                        <time className="text-sm text-gray-500 mb-2 block">
                          {formatDate(post.date, lang || 'es')}
                        </time>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h2
                            className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                        </Link>

                        {/* Excerpt */}
                        <div
                          className="text-gray-600 mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />

                        {/* Read More Link */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                        >
                          Leer más →
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  {page > 1 && (
                    <Link
                      href={`/blog?page=${page - 1}${lang ? `&lang=${lang}` : ''}`}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      ← Anterior
                    </Link>
                  )}

                  <span className="text-gray-600">
                    Página {page} de {pagination.totalPages}
                  </span>

                  {page < pagination.totalPages && (
                    <Link
                      href={`/blog?page=${page + 1}${lang ? `&lang=${lang}` : ''}`}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Siguiente →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No hay posts disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
