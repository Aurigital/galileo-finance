'use client';

import { useTranslation } from 'react-i18next';
import NewsCard from './NewsCard';

export default function RelatedNewsGrid({ posts }) {
  const { t } = useTranslation();

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 font-poppins">
      <h2 className="font-poppins font-medium text-xl text-[#C7C7C7] mb-4">{t('blog.relatedPosts')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
