import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, getFeaturedImage, formatDate, getAuthorName } from '@/lib/wordpress';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/Footer';

/**
 * Individual Blog Post Page - Server Component
 *
 * This page displays a single blog post fetched from WordPress.
 * It uses dynamic routes with generateStaticParams for ISR.
 *
 * TODO for frontend developer:
 * - Style the post content according to Galileo's design
 * - Add social sharing buttons
 * - Add related posts section
 * - Add comments section if needed
 * - Style WordPress content blocks properly
 * - Add breadcrumbs
 * - Integrate with i18n
 */

// Generate static params for all posts (ISR)
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const lang = searchParams.lang || null;

  const post = await getPostBySlug(slug, lang);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  const featuredImage = getFeaturedImage(post);

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params, searchParams }) {
  const { slug } = params;
  const lang = searchParams.lang || null;

  // Fetch the post
  const post = await getPostBySlug(slug, lang);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImage(post);
  const authorName = getAuthorName(post);

  return (
    <>
      <Navbar />
      <article className="min-h-screen bg-white">
        {/* Hero Section with Featured Image */}
        {featuredImage && (
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Content Container */}
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back to Blog Link */}
          <div className="py-6">
            <Link
              href="/blog"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              ← Volver al blog
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <time className="text-sm">
                {formatDate(post.date, lang || 'es')}
              </time>
              <span className="text-sm">•</span>
              <span className="text-sm">Por {authorName}</span>
            </div>
          </header>

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none mb-12
              prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-lg
              prose-ul:my-4 prose-ul:ml-6
              prose-ol:my-4 prose-ol:ml-6
              prose-li:text-gray-700
              prose-strong:text-gray-900
              prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic
            "
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Divider */}
          <hr className="my-12 border-gray-200" />

          {/* Back to Blog Button */}
          <div className="text-center pb-12">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Ver más artículos
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
