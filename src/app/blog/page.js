'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import FilterSidebar from '../components/blog/FilterSidebar';
import NewsGrid from '../components/blog/NewsGrid';
import { SearchProvider } from '../../lib/SearchContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function BlogContent() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ categories: [] });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    document.title = t('blog.pageTitle');

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('blog.metaDescription'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('blog.metaDescription');
      document.head.appendChild(meta);
    }
  }, [t]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="px-6 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto relative">

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
          <div className="flex-1 order-2">
            <Suspense fallback={<div className="text-gray-400">{t('blog.loadingPosts')}</div>}>
              <NewsGrid
                filters={filters}
                onOpenFilters={() => setIsMobileFiltersOpen(true)}
              />
            </Suspense>
          </div>

          <div className="order-1"> 
            <div className="hidden lg:block lg:sticky lg:top-24">
              <Suspense fallback={<div className="text-gray-400">{t('blog.loading')}</div>}>
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  isMobileOpen={false}
                  setIsMobileOpen={() => { }}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isMobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setIsMobileFiltersOpen(false)}
        />

        <div className={`fixed right-0 top-0 h-full w-80 bg-[#0a0a0a] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div className="p-4 h-full overflow-y-auto">
            <Suspense fallback={<div className="text-gray-400">{t('blog.loading')}</div>}>
              <FilterSidebar
                onFilterChange={handleFilterChange}
                isMobileOpen={isMobileFiltersOpen}
                setIsMobileOpen={setIsMobileFiltersOpen}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
    <SearchProvider>
      <div className="min-h-screen bg-[#101010] relative overflow-hidden">

        <div
          className="absolute -top-64 -right-64 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl pointer-events-none gradient-orb"
          style={{ background: 'radial-gradient(circle, #30F2FC 0%, #3B10D8 50%, transparent 70%)' }}
        />

        <div
          className="absolute -bottom-64 -left-64 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-3xl pointer-events-none gradient-orb-slow"
          style={{ background: 'radial-gradient(circle, #30F2FC 0%, #3B10D8 50%, transparent 70%)', animationDelay: '4s' }}
        />

        <Navbar />
        <div className="py-12 md:py-20 relative z-10">
          <BlogContent />
        </div>
      </div>
    </SearchProvider>
    <Footer />
    </>
  );
}
