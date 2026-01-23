'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsCard from './NewsCard';
import { IoFilter, IoReload, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { SearchContext } from '../../../lib/SearchContext';
import { getPostsAdvanced, getCategories } from '../../../lib/wordpress';

export default function NewsGrid({ filters, onOpenFilters }) {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [totalPosts, setTotalPosts] = useState(0);
  const [categoriesMap, setCategoriesMap] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);
  const { searchTerm } = useContext(SearchContext);

  // Get search term from URL or context (URL takes priority on initial load)
  const urlSearchTerm = searchParams.get('q') || '';
  const effectiveSearchTerm = urlSearchTerm || searchTerm;

  const isInitialMount = useRef(true);
  const prevFiltersRef = useRef(filters);
  const prevSearchRef = useRef(effectiveSearchTerm);
  const prevSortRef = useRef(sortBy);

  const POSTS_PER_PAGE = 6;

  // Load categories map once on mount
  useEffect(() => {
    let isMounted = true;

    const fetchCategoriesMap = async () => {
      try {
        const { categoriesMap: catMap } = await getCategories();
        if (isMounted) {
          setCategoriesMap(catMap);
        }
      } catch (error) {
        console.error('Error loading categories map:', error);
        if (isMounted) {
          setCategoriesMap({});
        }
      }
    };

    fetchCategoriesMap();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch posts when dependencies change
  useEffect(() => {
    if (categoriesMap === null) return;

    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoryIds = filters?.categories && filters.categories.length > 0
          ? filters.categories
              .map(slug => categoriesMap[slug])
              .filter(id => id !== undefined)
          : [];

        const result = await getPostsAdvanced({
          page: page,
          perPage: POSTS_PER_PAGE,
          categories: categoryIds,
          search: effectiveSearchTerm || '',
          orderBy: sortBy
        });

        if (isMounted) {
          setPosts(result.posts);
          setTotalPosts(result.totalItems);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido al cargar artículos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [categoriesMap, page, filters, effectiveSearchTerm, sortBy, retryTrigger]);

  // Reset page to 1 when filters/search/sort change (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const filtersChanged = JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);
    const searchChanged = prevSearchRef.current !== effectiveSearchTerm;
    const sortChanged = prevSortRef.current !== sortBy;

    if (filtersChanged || searchChanged || sortChanged) {
      setPage(1);
    }

    prevFiltersRef.current = filters;
    prevSearchRef.current = effectiveSearchTerm;
    prevSortRef.current = sortBy;
  }, [filters, effectiveSearchTerm, sortBy]);

  const handleRetry = () => {
    setError(null);
    setRetryTrigger(prev => prev + 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page, '...', totalPages);
      }
    }

    return pages;
  };

  if (error) {
    return (
      <div className="flex-1 font-poppins">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-[#3B10D8] mb-2">
              Error al cargar artículos
            </h3>
            <p className="text-[#6E6E6E] mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 mx-auto text-white border border-white/10 px-4 py-2 rounded-lg hover:border-[#3B10D8] hover:text-[#3B10D8] transition-all duration-300"
            >
              <IoReload className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins font-medium text-xl text-[#C7C7C7]">Últimas Publicaciones</h2>

        <div className="flex items-center gap-4">
          {totalPages > 1 && !loading && (
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`p-1.5 rounded-lg transition-all duration-300 ${page === 1
                    ? 'text-[#6E6E6E] cursor-not-allowed'
                    : 'text-[#C7C7C7] hover:text-[#3B10D8]'
                  }`}
              >
                <IoChevronBack className="w-4 h-4" />
              </button>

              {getPageNumbers().map((pageNum, idx) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${idx}`} className="text-[#6E6E6E] px-1">...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-7 h-7 rounded-lg text-sm transition-all duration-300 ${page === pageNum
                        ? 'bg-[#3B10D8] text-white'
                        : 'text-[#C7C7C7] hover:text-[#3B10D8]'
                      }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`p-1.5 rounded-lg transition-all duration-300 ${page === totalPages
                    ? 'text-[#6E6E6E] cursor-not-allowed'
                    : 'text-[#C7C7C7] hover:text-[#3B10D8]'
                  }`}
              >
                <IoChevronForward className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Botón filtros móvil */}
          <button
            onClick={onOpenFilters}
            className="lg:hidden flex items-center gap-2 bg-[#3B10D8] text-[#C7C7C7] px-3 py-2 rounded-lg hover:border-[#3B10D8] hover:text-[#3B10D8] transition-colors"
          >
            <IoFilter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
            <div key={index} className="animate-pulse">
              {/* Imagen skeleton */}
              <div className="aspect-[16/11] border border-white/10 rounded-2xl bg-white/5"></div>
              {/* Contenido skeleton */}
              <div className="py-3">
                <div className="h-5 bg-white/5 rounded mb-1 w-full"></div>
                <div className="h-5 bg-white/5 rounded mb-2 w-3/4"></div>
                <div className="flex items-center gap-1">
                  <div className="h-3 bg-white/5 rounded w-20"></div>
                  <span className="text-white/10">•</span>
                  <div className="h-3 bg-white/5 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`p-2 rounded-lg border transition-all duration-300 ${page === 1
                    ? 'border-white/5 text-[#6E6E6E] cursor-not-allowed'
                    : 'border-white/10 text-[#C7C7C7] hover:border-[#3B10D8] hover:text-[#3B10D8]'
                  }`}
              >
                <IoChevronBack className="w-5 h-5" />
              </button>

              {getPageNumbers().map((pageNum, idx) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-bottom-${idx}`} className="text-[#6E6E6E] px-2">...</span>
                ) : (
                  <button
                    key={`bottom-${pageNum}`}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${page === pageNum
                        ? 'bg-[#3B10D8] text-white'
                        : 'border border-white/10 text-[#C7C7C7] hover:border-[#3B10D8] hover:text-[#3B10D8]'
                      }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`p-2 rounded-lg border transition-all duration-300 ${page === totalPages
                    ? 'border-white/5 text-[#6E6E6E] cursor-not-allowed'
                    : 'border-white/10 text-[#C7C7C7] hover:border-[#3B10D8] hover:text-[#3B10D8]'
                  }`}
              >
                <IoChevronForward className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6E6E6E] text-lg">
            No se encontraron artículos
            {effectiveSearchTerm && ` para "${effectiveSearchTerm}"`}
          </p>
        </div>
      )}
    </div>
  );
}
