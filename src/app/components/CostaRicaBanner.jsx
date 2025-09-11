"use client";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const CostaRicaBanner = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="px-4 sm:px-6 lg:px-14">
            <div className="relative max-w-7xl mx-auto px-8 lg:px-10 bg-gradient-to-tr from-[#28C0F5] to-[#3B10D8] rounded-3xl overflow-hidden md:aspect-[10/4]">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/cr-map.svg"
                        alt="Costa Rica abstract map"
                        fill
                        priority={false}
                        className="object-cover hidden md:block"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                </div>

                <div className="relative flex items-center h-full">
                    <div className="max-w-3xl py-14 md:py-0">
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-poppins drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                            {t('crBanner.title')}
                        </h2>
                        <p className="mt-5 text-white/90 font-poppins font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                            {t('crBanner.subtitle')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostaRicaBanner; 