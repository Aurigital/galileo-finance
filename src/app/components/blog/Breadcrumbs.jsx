'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IoChevronForward, IoHome } from 'react-icons/io5';

export default function Breadcrumbs({ category, title }) {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-[#6E6E6E]">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#3B10D8] transition-colors"
          >
            <IoHome className="w-4 h-4" />
            <span className="sr-only">{t('nav.home')}</span>
          </Link>
        </li>

        <li className="flex items-center">
          <IoChevronForward className="w-4 h-4 mx-1" />
          <Link
            href="/blog"
            className="hover:text-[#3B10D8] transition-colors"
          >
            Blog
          </Link>
        </li>

        {category && (
          <li className="flex items-center">
            <IoChevronForward className="w-4 h-4 mx-1" />
            <span className="text-[#C7C7C7]">{category}</span>
          </li>
        )}

        {title && (
          <li className="flex items-center max-w-[200px] sm:max-w-[300px]">
            <IoChevronForward className="w-4 h-4 mx-1 flex-shrink-0" />
            <span className="text-[#C7C7C7] truncate">{title}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}
