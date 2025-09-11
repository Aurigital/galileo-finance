'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true });

  return (
    <section className="xl:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-visible xl:h-[550px] flex items-end">
          <div className="flex xl:flex-row gap-0 rounded-3xl w-full border border-white/10 bg-gradient-to-br from-slate-900/50 to-purple-900/30">
            <div className="px-8 md:px-12 pt-8 md:pt-12 xl:pb-12 flex flex-col justify-center xl:w-[40%]">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight font-poppins">
                {t('howItWorks.title_line1')}<br />
                {t('howItWorks.title_line2')}
              </h2>
              <p className="mt-3 text-white font-poppins text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {t('howItWorks.subtitle')}
              </p>

              <Image
                src="/assets/howitworks.png"
                alt="Teléfono con app"
                width={500}
                height={500}
                className="w-full h-full object-contain block xl:hidden"
              />
            </div>
            

            <div className="relative xl:w-[70%] hidden xl:block">
              <div className="absolute -top-[24rem] bottom-0 -left-10 w-[700px] h-[800px]">
                <Image
                  src="/assets/howitworks.png"
                  alt="Teléfono con app"
                  fill
                  className="drop-shadow-2xl object-contain"
                  sizes="(min-width: 1024px) 500px, 400px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1">
          {Array.isArray(steps) && steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center">
              <div className="w-52 h-52 rounded-full bg-[url('/assets/UiCircle.png')] bg-contain bg-center bg-no-repeat flex items-center justify-center text-white font-bold text-4xl">
                {idx + 1}
              </div>
              <div className="flex flex-col mb-4 text-center md:text-left">
              <h3 className="text-white font-poppins font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {step.title}
              </h3>
              <p className="mt-2 text-white/80 font-poppins text-sm md:text-base lg:text-lg xl:text-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 