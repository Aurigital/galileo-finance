'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import Image from 'next/image';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

export default function InfiniteCarousel() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: '22%',
    slidesToShow: 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1536, settings: { centerPadding: '20%' } },
      { breakpoint: 1280, settings: { centerPadding: '18%' } },
      { breakpoint: 1024, settings: { centerPadding: '14%' } },
      { breakpoint: 768, settings: { centerPadding: '8%' } },
      { breakpoint: 640, settings: { centerPadding: '0' } },
    ],
  };

  return (
    <section className="w-full pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-10 md:mb-14 font-poppins">
                {t('services.title_line1')} <br />
                {t('services.title_line2')}
            </h2>
        </div>

      <div className="w-full">
        <Slider {...settings}>
          {Array.isArray(items) && items.map((item, index) => (
            <div key={index} className="px-3 md:px-4">
              <article className="rounded-3xl bg-black/30 p-0 overflow-hidden">
                <div className="relative w-full h-64 md:h-auto md:aspect-[8/5]">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 800px, 90vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-white text-lg md:text-2xl font-bold font-poppins leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm md:text-base font-poppins font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
} 