'use client';

import { Suspense } from 'react';
import FilterSidebar from '../../components/blog/FilterSidebar';
import { SearchProvider } from '../../../lib/SearchContext';

export default function BlogPostClient({ children, relatedContent }) {
  return (
    <SearchProvider>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-20 md:py-28">
        {/* Sidebar */}
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

        {/* Content */}
        <article className="flex-1 order-2 min-w-0">
          {children}
          {/* Related Posts */}
          {relatedContent}
        </article>
      </div>
    </SearchProvider>
  );
}
