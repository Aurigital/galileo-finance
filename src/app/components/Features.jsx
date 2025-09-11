"use client";
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

const FeatureCard = ({ title, description, emphasis = false }) => {
	return (
		<div className={`relative rounded-2xl bg-black/30 backdrop-blur-sm p-6 md:p-8 transition-transform duration-200 ${emphasis ? '' : ''}`}>
			<div className="">
				<h3 className="text-white text-xl md:text-2xl lg:text-3xl font-poppins font-bold tracking-tight border-l-4 border-[#00FFFF] pl-4">{title}</h3>
				<p className="mt-3 text-white font-poppins font-light text-sm md:text-base lg:text-lg leading-relaxed">{description}</p>
			</div>
		</div>
	);
};

const Features = () => {
	const { t } = useTranslation();
	const items = t('features.items', { returnObjects: true });

	return (
		<section id="features" className="">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-10 md:mb-14 font-poppins">
					{t('features.title')}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{Array.isArray(items) && items.slice(0, 4).map((item, index) => (
						<FeatureCard
							key={index}
							title={item.title}
							description={item.description}
						/>
					))}
					{Array.isArray(items) && items[4] && (
						<div className="md:col-span-2">
							<FeatureCard title={items[4].title} description={items[4].description} emphasis />
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Features; 