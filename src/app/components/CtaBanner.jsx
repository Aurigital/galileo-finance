"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const CtaBanner = () => {
	const { t } = useTranslation();

	return (
		<section className="relative overflow-visible bg-gradient-to-br from-[#3B10D8] to-[#28C0F5] ">
			<div className="absolute inset-0 bg-black/5" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14 md:py-20">
					<div>
						<h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins" style={{ lineHeight: '1.2' }}>
							{t('ctaBanner.title')}
						</h2>
						<p className="mt-6 font-poppins font-light text-base sm:text-lg md:text-xl max-w-2xl">
							{t('ctaBanner.subtitle')}
						</p>
						<p className="mt-6 sm:text-lg md:text-xl max-w-2xl text-white font-semibold font-inter">{t('ctaBanner.cta')}</p>

						<div className="mt-6 flex items-center gap-4 flex-col md:flex-row">
						   <a href='' className="border border-white/50 rounded-md px-3 py-1.5 gap-2 bg-black text-white font-semibold flex items-center flex-row hover:scale-105 transition-all duration-300">
								<img src="/assets/google-icon.png" alt="Apple Icon" className="" width={25} height={25} />
								<span className="flex flex-col text-center">
									<p className="font-poppins font-light text-xs text-white/50">{t('ctaBanner.download')}</p>
									<p className="font-poppins font-semibold text-2xl -mt-1">Google Play</p>
								</span>
							</a>

							<a href='' className="border border-white/50 rounded-md px-3 py-1.5 gap-2 bg-black text-white font-semibold flex items-center flex-row hover:scale-105 transition-all duration-300">
								<img src="/assets/apple-icon.png" alt="Apple Icon" className="invert" width={25} height={25} />
								<span className="flex flex-col text-center">
									<p className="font-poppins font-light text-xs text-white/50">{t('ctaBanner.download')}</p>
									<p className="font-poppins font-semibold text-2xl -mt-1">App Store</p>
								</span>
							</a>
						</div>

						<img src="/assets/CTA.png" alt="Galileo Phones" className="contain mt-10 block lg:hidden justify-self-center" />
					</div>

					<div className="relative hidden lg:block">
						<div className="absolute -top-[22rem] right-0 w-[600px] h-[700px]">
							<Image 
								src="/assets/CTA.png" 
								alt="Galileo Phones" 
								width={500} 
								height={600}
								className="object-contain w-full h-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CtaBanner;