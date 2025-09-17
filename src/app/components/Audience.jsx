'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const TextCard = ({ title, description }) => (
  <div
    className="rounded-2xl bg-black/30 backdrop-blur-sm p-6 md:p-8 "
    data-aos="fade-up"
  >
    <h3 className="text-white text-xl md:text-2xl font-poppins font-bold tracking-tight mb-4">
      {title}
    </h3>
    <p className="text-white font-poppins font-light leading-relaxed text-sm md:text-base xl:text-lg">
      {description}
    </p>
  </div>
);

const ImageTile = ({ src, alt }) => (
  <div className="rounded-2xl overflow-hidden aspect-video" data-aos="zoom-in">
    <div className="relative w-full h-full">
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="(min-width: 1024px) 33vw, 100vw" />
    </div>
  </div>
);

export default function Audience() {
  const { t } = useTranslation();
  const items = t('audience.items', { returnObjects: true });
  const images = t('audience.images', { returnObjects: true });

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-10 md:mb-14 font-poppins text-center md:text-left" data-aos="fade-up">
          {t('audience.title_line1')} {t('audience.title_line2')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4">
            {images?.[0] && <ImageTile src={images[0].src} alt={images[0].alt} />}
            {items?.[0] && <TextCard title={items[0].title} description={items[0].description} />}
          </div>

          <div className="flex flex-col gap-4">
            <div className="order-2 md:order-1">
              {items?.[1] && <TextCard title={items[1].title} description={items[1].description} />}
            </div>
            <div className="order-1 md:order-2">
              {images?.[1] && <ImageTile src={images[1].src} alt={images[1].alt} />}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {images?.[2] && <ImageTile src={images[2].src} alt={images[2].alt} />}
            {items?.[2] && <TextCard title={items[2].title} description={items[2].description} />}
          </div>
        </div>
      </div>
    </section>
  );
}