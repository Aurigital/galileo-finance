'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import FilterSidebar from '../../components/blog/FilterSidebar';
import Breadcrumbs from '../../components/blog/Breadcrumbs';
import { SearchProvider } from '../../../lib/SearchContext';

export default function BlogPostClient({ children, relatedContent, category, title }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const initialLang = useRef(i18n.language);

  useEffect(() => {
    if (initialLang.current && i18n.language !== initialLang.current) {
      router.push('/blog');
    }
  }, [i18n.language, router]);

  return (
    <SearchProvider>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-20 md:py-28">
        <div className="order-1 lg:order-2 lg:w-72 flex-shrink-0">
          <div className="hidden lg:block lg:sticky lg:top-24">
            <Suspense fallback={<div className="text-gray-400">Cargando...</div>}>
              <FilterSidebar
                onFilterChange={() => {}}
                isMobileOpen={false}
                setIsMobileOpen={() => {}}
              />
            </Suspense>
          </div>
        </div>

        <article className="flex-1 order-2 min-w-0">
          <Breadcrumbs category={category} title={title} />
          {children}
          {relatedContent}
        </article>
      </div>
    </SearchProvider>
  );
}
