"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [language, setLanguage] = useState('EN');
  const pathname = usePathname();

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'ES' : 'EN');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Galileo Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Toggle and CTA Button */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              {language === 'EN' ? 'EN | ES' : 'ES | EN'}
            </button>
            <Link
              href="/download"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Descargá la App
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-300 hover:text-white p-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-indigo-600 hover:text-white'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            {language === 'EN' ? 'EN | ES' : 'ES | EN'}
          </button>
          <Link
            href="/download"
            className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Descargá la App
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
