"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const { t, i18n } = useTranslation();

	const navigation = [
		{ name: t('nav.about'), href: '/about' },
		{ name: t('nav.features'), href: '/features' },
		{ name: t('nav.team'), href: '/team' },
		{ name: t('nav.contact'), href: '/contact' },
	];

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<div className="flex-shrink-0">
						<Link href="/">
							<Image
								src="/assets/logo.svg"
								alt="Galileo Logo"
								width={120}
								height={40}
								className="h-5 w-auto"
							/>
						</Link>
					</div>

					<div className="hidden md:block">
						<div className="flex items-center space-x-8 ml-20">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`${
										pathname === item.href
											? 'text-[#D9D9D9] font-bold'
											: 'text-[#D9D9D9] hover:font-bold'
									} px-3 py-2 text-md transition-all font-light duration-200`}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>

					<div className="hidden md:flex items-center space-x-6">
						<button
							onClick={toggleLanguage}
							className="text-gray-300 hover:text-white text-sm font-medium"
						>
							{i18n.language === 'en' ? 'EN | ES' : 'ES | EN'}
						</button>
						<Link
							href="/download"
              className="relative  inline-flex  text-center rounded-md font-bold font-inter bg-[#3B10D8] px-4 py-2.5 text-base text-white transition-all duration-300 hover:shadow-[0_12px_24px_-4px_rgba(99,102,241,0.65)]"

          >
							{t('cta.download')}
						</Link>
					</div>

					<div className="md:hidden flex items-center">
						<button
							type="button"
							onClick={toggleMenu}
							className="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200"
							aria-controls="mobile-menu"
							aria-expanded={isMenuOpen}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
							>
								{isMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div
				id="mobile-menu"
				className={`md:hidden transition-all duration-300 ease-out ${
					isMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
				} overflow-hidden`}
			>
				<div className="border-t border-white/20 shadow-2xl">
					<div className="px-6 py-6 space-y-1">
						{navigation.map((item, index) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className={`${
									pathname === item.href
										? 'text-white bg-white/10 border-l-4 border-[#3B10D8]'
										: 'text-gray-300 hover:text-white hover:bg-white/5'
								} block px-4 py-3 text-lg font-light transition-all duration-200 rounded-r-md`}
								style={{
									animationDelay: `${index * 50}ms`
								}}
							>
								{item.name}
							</Link>
						))}
					</div>

					<div className="border-t border-white/10 mx-6"></div>

					<div className="px-6 py-6 space-y-4">
                    <button
							onClick={toggleLanguage}
							className="text-gray-300 hover:text-white text-sm font-medium w-full text-center"
						>
							{i18n.language === 'en' ? 'EN | ES' : 'ES | EN'}
						</button>
						
						<Link
							href="/download"
							onClick={() => setIsMenuOpen(false)}
							className="block w-full text-center rounded-lg font-bold bg-[#3B10D8] px-6 py-4 text-lg text-white transition-all duration-300 hover:bg-[#3B10D8]/90 hover:shadow-[0_12px_24px_-4px_rgba(59,16,216,0.4)] transform hover:scale-[0.98] active:scale-[0.96]"
						>
							{t('cta.download')}
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;