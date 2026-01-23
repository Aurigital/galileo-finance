'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedImage, getCategory, formatDate, cleanHtml } from '../../../lib/wordpress';

export default function NewsCard({ post }) {
  const featuredImage = getFeaturedImage(post);
  const category = getCategory(post);

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group overflow-hidden hover:scale-[1.02] transition-all duration-700 animate-fadeInUp">

        <div className="relative aspect-[16/11] border border-white/10 rounded-2xl overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={cleanHtml(post.title.rendered)}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/50 text-sm">Sin imagen</span>
            </div>
          )}
        </div>

        <div className="py-3">
          <h3 className="font-poppins text-lg font-medium text-white line-clamp-2 mb-1">
            {cleanHtml(post.title.rendered)}
          </h3>

          <div className='flex items-center gap-1'>
          <span className="text-xs font-medium text-white/40">
            {formatDate(post.date)}
          </span>
          •
          <span className="inline-block text-white text-xs font-medium">
            {category}
          </span>
          </div>

        </div>
      </article>
    </Link>
  );
}
