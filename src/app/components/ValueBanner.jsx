"use client";
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const ValueBanner = () => {
	const { t } = useTranslation();

	return (
		<section className="relative w-full h-[80vh] flex items-end md:items-center">
			<div className="absolute inset-0">
				<div
					className="h-full w-full bg-cover bg-top"
					style={{ backgroundImage: "url('/assets/ValueBanner2.png')" }}
				/>
				<div className="absolute inset-0 bg-gradient-to-tr from-[#3B10D8]/85 to-[#00FFFF]/40" />
                <div className="absolute inset-0 bg-black/10"/>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 w-full">
				<div className="w-full max-w-[32rem]" data-aos="fade-right">
					<h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.9rem] font-extrabold font-poppins text-left" style={{ lineHeight: '1.1' }}>
						{t('valueBanner.title_line')}
					</h2>
					<p className="mt-3 text-white font-poppins font-light text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-left">
						{t('valueBanner.preamble')} <span className="font-semibold">{t('valueBanner.bold')}</span>, {t('valueBanner.postscript')}
					</p>
				</div>
			</div>
		</section>
	);
};

export default ValueBanner;