import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import RelatedNewsGrid from '../../components/blog/RelatedNewsGrid';
import BlogPostClient from './BlogPostClient';
import {
  getPostBySlug,
  getAllPostSlugs,
  getFeaturedImage,
  getCategory,
  formatDate,
  cleanHtml,
  getRelatedPosts,
  getAuthorName
} from '../../../lib/wordpress';

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Galileo Capital',
      description: 'El artículo que buscas no existe o ha sido eliminado.'
    };
  }

  const title = cleanHtml(post.title.rendered);
  const description = cleanHtml(post.excerpt.rendered);
  const image = getFeaturedImage(post);

  return {
    title: `${title} | Galileo Capital`,
    description: description || `Lee el artículo: ${title}`,
    openGraph: {
      title: title,
      description: description,
      images: image ? [image] : [],
      type: 'article',
      publishedTime: post.date
    }
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImage(post);
  const category = getCategory(post);
  const author = getAuthorName(post);
  const title = cleanHtml(post.title.rendered);

  // Get category ID for related posts
  const mainCategory = post._embedded?.['wp:term']?.[0]?.[0];
  const categoryId = mainCategory?.id;

  // Fetch related posts (same category, newest first)
  let relatedPosts = [];
  if (categoryId) {
    relatedPosts = await getRelatedPosts(categoryId, post.id, 3);
  }

  return (
    <>
      <div className="min-h-screen bg-[#101010] relative overflow-hidden font-poppins">
        {/* Degradados animados */}
        <div
          className="absolute -top-64 -right-64 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl pointer-events-none gradient-orb"
          style={{ background: 'radial-gradient(circle, #30F2FC 0%, #3B10D8 50%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -left-1/3 w-[500px] h-[500px] md:w-[1000px] md:h-[1000px] rounded-full blur-3xl pointer-events-none gradient-orb-slow"
          style={{ background: 'radial-gradient(circle, #30F2FC 0%, #3B10D8 50%, transparent 70%)', animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-64 -right-64 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-3xl pointer-events-none gradient-orb-float"
          style={{ background: 'radial-gradient(circle, #30F2FC 0%, #3B10D8 50%, transparent 70%)', animationDelay: '4s' }}
        />

        <Navbar />

        <main className="relative z-10">
          <div className="px-6 sm:px-8 max-w-7xl mx-auto">
            <BlogPostClient
              category={category}
              title={title}
              relatedContent={
                relatedPosts.length > 0 ? (
                  <div className="mt-16">
                    <RelatedNewsGrid posts={relatedPosts} />
                  </div>
                ) : null
              }
            >
              <div className="mb-8 text-center flex flex-col items-center mx-auto">
                <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#3B10D8] text-white text-xs font-medium">
                  {category}
                </span>

                <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                  {title}
                </h1>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#C7C7C7]">{author}</span>
                  <span className="text-[#6E6E6E]">•</span>
                  <span className="text-[#6E6E6E]">{formatDate(post.date)}</span>
                </div>
              </div>

              {featuredImage && (
                <div className="relative aspect-video mb-10 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={featuredImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
              )}

              <div
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </BlogPostClient>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
