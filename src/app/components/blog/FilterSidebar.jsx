'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { IoClose, IoSearch } from 'react-icons/io5';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { IoMail } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { SearchContext } from '../../../lib/SearchContext';
import { getCategories, getPostsAdvanced, getFeaturedImage, formatDate, cleanHtml, getCategory } from '../../../lib/wordpress';

const FilterSidebar = ({ onFilterChange, isMobileOpen = false, setIsMobileOpen = () => { } }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: []
  });

  const [availableFilters, setAvailableFilters] = useState({
    categories: []
  });

  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const isInitialLoad = useRef(true);
  const prevFiltersRef = useRef(null);

  const updateURL = (filters, search = null) => {
    const params = new URLSearchParams();
    if (filters.categories.length > 0) {
      params.set('categories', filters.categories.join(','));
    }
    // Include search term in URL
    const searchValue = search !== null ? search : searchTerm;
    if (searchValue) {
      params.set('q', searchValue);
    }
    const newURL = params.toString() ? `/blog?${params.toString()}` : '/blog';

    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/blog') {
        router.replace(newURL, { scroll: false });
      } else {
        router.push(newURL);
      }
    }
  };

  const loadFiltersFromURL = () => {
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const search = searchParams.get('q') || '';
    return { categories, search };
  };

  useEffect(() => {
    let isMounted = true;

    // Reset loading states when language changes
    setLoading(true);
    setLoadingFeatured(true);
    setFeaturedPosts([]);

    const fetchCategories = async () => {
      try {
        // Get current language for Polylang
        const currentLang = i18n.language || 'es';

        const { categories, categoriesMap } = await getCategories(currentLang);

        if (!isMounted) return;

        setAvailableFilters({
          categories: categories
            .map((cat) => ({
              label: cat.name,
              count: cat.count,
              slug: cat.slug
            }))
            .sort((a, b) => b.count - a.count)
        });

        const urlFilters = loadFiltersFromURL();
        setSelectedFilters({ categories: urlFilters.categories });
        prevFiltersRef.current = JSON.stringify({ categories: urlFilters.categories });

        // Load search term from URL
        if (urlFilters.search) {
          setSearchTerm(urlFilters.search);
        }

        setLoading(false);

        // Notify parent of initial filters
        onFilterChange?.({ categories: urlFilters.categories });

        // Fetch featured posts (categoría "destacados" en español, "featured" en inglés)
        const featuredSlug = currentLang === 'en' ? 'featured' : 'destacados';
        const featuredId = categoriesMap[featuredSlug];
        if (featuredId && isMounted) {
          const result = await getPostsAdvanced({
            perPage: 3,
            categories: [featuredId],
            lang: currentLang
          });
          if (isMounted) {
            setFeaturedPosts(result.posts);
            setLoadingFeatured(false);
          }
        } else if (isMounted) {
          setLoadingFeatured(false);
        }

        isInitialLoad.current = false;
      } catch (error) {
        console.error('Error fetching WordPress categories:', error);
        if (isMounted) {
          setLoading(false);
          setLoadingFeatured(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  // Only notify parent when filters actually change (not on initial load)
  useEffect(() => {
    if (isInitialLoad.current || loading) return;

    const currentFilters = JSON.stringify(selectedFilters);
    if (prevFiltersRef.current !== currentFilters) {
      prevFiltersRef.current = currentFilters;
      onFilterChange?.(selectedFilters);
    }
  }, [selectedFilters]);

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      const newFilters = {
        ...prev,
        [category]: newValues
      };
      updateURL(newFilters);
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL(selectedFilters, searchTerm);
  };

  return (
    <div className="w-full lg:w-72 text-[#C7C7C7] flex flex-col gap-10 font-poppins">

      <div>
        <h2 className="font-poppins font-medium text-xl mb-2 text-[#C7C7C7]">{t('blog.search')}</h2>
        <form onSubmit={handleSearch} className="relative">
          <button type="submit" className="absolute left-3 top-2">
            <IoSearch className="w-5 h-5 text-[#6E6E6E]" />
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('blog.searchPlaceholder')}
            className="w-full bg-transparent border border-white/10 pl-10 rounded-lg px-4 py-2 text-sm text-gray-300 placeholder-[#6E6E6E] focus:outline-none"
          />
        </form>
      </div>

      <div>
      <h2 className="font-poppins font-medium text-xl mb-2 text-[#C7C7C7]">{t('blog.filterByCategory')}</h2>
        {loading ? (
          <div className="flex flex-wrap gap-2 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 bg-white/5 border border-white/10 rounded-lg w-24"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableFilters.categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCheckboxChange('categories', category.slug)}
                className={`
                  px-3 py-2 rounded-lg text-sm hover:scale-105 transition-all duration-300
                  flex items-center justify-between border border-white/10 text-[#C7C7C7]
                  ${selectedFilters.categories.includes(category.slug)
                    ? 'bg-[#3B10D8] text-white border-[#3B10D8]'
                    : 'hover:bg-[#3B10D8]/50'
                  }
                `}
              >
                <span className="truncate">{category.label}</span>
                <span className="text-xs ml-2 flex-shrink-0">({category.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-poppins font-medium text-xl mb-4 text-[#C7C7C7]">{t('blog.otherPosts')}</h2>
        {loadingFeatured ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 border border-white/10 p-1.5 rounded-md animate-pulse">
                <div className="w-14 h-14 bg-white/5 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-3.5 bg-white/5 rounded mb-2 w-full"></div>
                  <div className="h-3.5 bg-white/5 rounded w-2/3"></div>
                  <div className="h-2.5 bg-white/5 rounded w-20 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredPosts.length > 0 ? (
          <div className="space-y-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-3 border border-white/10 hover:scale-105 p-1.5 rounded-md transition-all duration-500"
              >
                <div className="w-14 h-14 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                  {getFeaturedImage(post) ? (
                    <Image
                      src={getFeaturedImage(post)}
                      alt={cleanHtml(post.title.rendered)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#3B10D8] to-[#1a0560]"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-white font-medium line-clamp-2">
                    {cleanHtml(post.title.rendered)}
                  </h3>
                  <p className="text-xs text-[#6E6E6E] group-hover:text-white/80 font-medium mt-1">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#6E6E6E]">{t('blog.noFeaturedPosts')}</p>
        )}
      </div>

      <div>
        <h2 className="font-poppins font-medium text-xl mb-2 text-[#C7C7C7]">{t('blog.contactUs')}</h2>
        <div className="grid gap-2">
          <a
            href="mailto:contacto@galileo.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white/10 text-white rounded-lg px-4 py-2 space-x-2 hover:border-[#3B10D8] hover:text-[#3B10D8] transition-colors"
          >
            <IoMail className="w-5 h-5" />
            <span className="text-sm">LinkedIn</span>
          </a>

          <a
            href="https://instagram.com/galileo_finance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white/10 text-white rounded-lg px-4 py-2 space-x-2 hover:border-[#3B10D8] hover:text-[#3B10D8] transition-colors"
          >
            <FaInstagram className="w-5 h-5" />
            <span className="text-sm">Instagram</span>
          </a>

          <a
            href="https://wa.me/50640015769"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white/10 text-white rounded-lg px-4 py-2 space-x-2 hover:border-[#3B10D8] hover:text-[#3B10D8] transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span className="text-sm">Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
