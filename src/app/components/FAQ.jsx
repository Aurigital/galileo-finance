"use client";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaMinus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../lib/i18n';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
	return (
		<div className="rounded-lg bg-black/20 backdrop-blur-sm overflow-hidden transition-all duration-300">
			<button
				onClick={onClick}
				className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-white/5 transition-colors duration-200"
				aria-expanded={isOpen}
			>
				<h4 className="text-white text-sm md:text-base font-poppins font-medium pr-4 flex-1">
					{question}
				</h4>
				<div className="flex-shrink-0 text-[#00FFFF]">
					{isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
				</div>
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 ${
					isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="px-4 md:px-5 pb-4 md:pb-5">
					<p className="text-white/80 font-poppins font-light text-sm md:text-base leading-relaxed whitespace-pre-line">
						{answer}
					</p>
				</div>
			</div>
		</div>
	);
};

const FAQCategory = ({ title, items, isOpen, onToggle }) => {
	const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

	const handleQuestionToggle = (index) => {
		setOpenQuestionIndex(openQuestionIndex === index ? null : index);
	};

	return (
		<div className="mb-4 md:mb-5">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between p-5 md:p-6 rounded-xl bg-black/40 backdrop-blur-sm hover:bg-black/50 transition-all duration-200 border border-[#00FFFF]/20"
				aria-expanded={isOpen}
			>
				<h3 className="text-white text-xl md:text-2xl font-poppins font-bold flex items-center">
					<span className="w-1 h-6 md:h-8 bg-[#00FFFF] mr-3 rounded-full"></span>
					{title}
				</h3>
				<div className="flex-shrink-0 text-[#00FFFF]">
					{isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
				</div>
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 ${
					isOpen ? 'max-h-[10000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="space-y-2 md:space-y-3 pl-4 md:pl-6">
					{items.map((item, index) => (
						<FAQItem
							key={index}
							question={item.question}
							answer={item.answer}
							isOpen={openQuestionIndex === index}
							onClick={() => handleQuestionToggle(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const FAQ = () => {
	const { t } = useTranslation();
	const categories = t('faq.categories', { returnObjects: true });
	const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

	const handleCategoryToggle = (index) => {
		setOpenCategoryIndex(openCategoryIndex === index ? null : index);
	};

	return (
		<section id="faq" className="py-12 md:py-16">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2
					className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-poppins text-center"
					data-aos="fade-up"
				>
					{t('faq.title')}
				</h2>
				<p
					className="text-white/80 text-center text-base md:text-lg font-poppins font-light mb-10 md:mb-14"
					data-aos="fade-up"
					data-aos-delay="100"
				>
					{t('faq.subtitle')}
				</p>
				<div data-aos="fade-up" data-aos-delay="200">
					{Array.isArray(categories) && categories.map((category, index) => (
						<FAQCategory
							key={index}
							title={category.title}
							items={category.items}
							isOpen={openCategoryIndex === index}
							onToggle={() => handleCategoryToggle(index)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
