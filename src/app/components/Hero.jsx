 "use client";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const Hero = () => {
	const { t } = useTranslation();

	return (
		<section className="pt-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-12 font-poppins" data-aos="fade-up">
						<span>{t('hero.title_line1')}</span>
						<br />
						<span>{t('hero.title_line2')}</span>
					</h1>
					
					<div className="flex justify-center mb-12" data-aos="fade-up">
						<Image
							src="/assets/hero-phones.avif"
							alt="App preview phones"
							width={560}
							height={480}
							priority
						/>
					</div>
					
					<p className="mt-6 text-white font-poppins font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8" data-aos="fade-up">
					<span className="font-bold">{t('hero.subtitle_line1')}</span> {t('hero.subtitle')}
					</p>
					
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up">
						<Link
							href="https://app.galileo.finance/register"
							target="_blank"
							rel="noopener noreferrer"
							className="relative inline-flex text-center rounded-md font-medium font-inter border-2 border-white/30 px-7 py-3 text-base text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
						>
							{t('cta.register')}
						</Link>
						<Link
							href="#download"
							className="relative inline-flex text-center rounded-md font-bold font-inter bg-[#3B10D8] px-7 py-3 text-base text-white transition-all duration-300 hover:shadow-[0_12px_24px_-4px_rgba(99,102,241,0.65)]"
						>
							{t('cta.download')}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;