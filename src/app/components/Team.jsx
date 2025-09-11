'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const ExecutiveCard = ({ name, role, imageSrc }) => {
	const src = imageSrc || '/assets/isotipo.avif';
	return (
		<div className="flex flex-col items-center text-center font-poppins">
			<div className="relative">
				<div className="absolute inset-0 -z-10 blur-2xl rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),rgba(147,51,234,0.15),transparent_70%)]" style={{ boxShadow: '0 0 10px 0 rgba(59,130,246,0.35), 0 0 20px 0 rgba(147,51,234,0.15)' }} />
				<div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-sky-500/70 to-indigo-500/70 p-[4px]">
					<div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white/10">
						<Image src={src} alt={name} width={160} height={160} className="w-full h-full object-cover" />
					</div>
				</div>
			</div>
			<div className="mt-4">
				<p className="text-white text-sm md:text-base font-semibold leading-tight">{name}</p>
				<p className="text-white text-xs md:text-[13px] mt-1">{role}</p>
			</div>
		</div>
	);
};

export default function Team() {
	const { t } = useTranslation();
	const aboutParagraphs = t('team.about.paragraphs', { returnObjects: true });
	const executives = t('team.executives.items', { returnObjects: true });

	return (
		<section id="team" className="">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 font-poppins" data-aos="fade-right">
					{t('team.title_line1')}
					<br />
					{t('team.title_line2')}
				</h2>

				<div className="mt-8" data-aos="fade-right">
					<h3 className="text-white font-poppins font-bold text-xl md:text-2xl">{t('team.about.title')}</h3>
					<div className="mt-4 space-y-4">
						{Array.isArray(aboutParagraphs) && aboutParagraphs.map((p, i) => (
							<p key={i} className="text-white font-poppins font-light leading-relaxed text-sm md:text-base xl:text-lg">
								{p}
							</p>
						))}
					</div>
				</div>

				<div className="mt-10" data-aos="fade-right">
					<h3 className="text-white font-poppins font-bold text-xl md:text-2xl">{t('team.executives.title')}</h3>
					<div className="mt-6 flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16">
						{Array.isArray(executives) && executives.map((m, idx) => (
							<div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
								<ExecutiveCard name={m.name} role={m.role} imageSrc={m.image} />
							</div>
						))}
					</div>
				</div>

				<div className="mt-12" data-aos="fade-right">
					<h3 className="text-white font-poppins font-bold text-xl md:text-2xl">{t('team.advisors.title')}</h3>
					<p className="mt-4 text-white font-poppins font-light leading-relaxed text-sm md:text-base xl:text-lg">
						{t('team.advisors.description')}
					</p>
				</div>
			</div>
		</section>
	);
} 