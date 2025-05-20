import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import BookingPage from "../Booking/BookingPage";

const LoadingSkeleton = () => (
	<div className="container mx-auto flex flex-col items-center justify-center h-[60vh] space-y-3 animate-pulse">
		<div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-md" />
		<div className="h-60 w-full max-w-3xl bg-gray-200 dark:bg-gray-700 rounded-lg" />
		<div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md" />
		<div className="h-12 w-full max-w-sm bg-gray-200 dark:bg-gray-700 rounded-md" />
	</div>
);

const SkillAccordion = ({ programme }) => {
	if (!programme || programme.length === 0) return null;
	return (
		<div className="space-y-3">
			{programme.map((module, idx) => (
				<details
					key={`${module.title}-${idx}`}
					className="group border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/40 [&_summary::-webkit-details-marker]:hidden"
				>
					<summary className="cursor-pointer select-none p-3 flex items-center justify-between font-medium">
						<span className="text-blue-600">
							{module.title}
							{module.duration && (
								<span className="text-gray-500 dark:text-gray-400"> ({module.duration})</span>
							)}
						</span>
						<span className="transition-transform group-open:rotate-180">▼</span>
					</summary>

					<div className="pl-4 pr-2 pb-3 pt-1 space-y-4 text-sm text-gray-700 dark:text-gray-300">
						{module.objectives && (
							<div>
								<h3 className="font-medium">Objectifs :</h3>
								<ul className="list-disc list-inside space-y-1">
									{module.objectives.map((obj, i) => (
										<li key={i}>{obj}</li>
									))}
								</ul>
							</div>
						)}
						{
							console.log(module)
						}
						{module.programme && (
							<div>
								<h3 className="font-medium">programme :</h3>
								<ul className="list-disc list-inside space-y-1">
									{module.programme?.map((module) =>
										module?.exercises?.map((submodule, i) => (
											<li key={i}>
												{module.title}
											</li>
										))
									)}
								</ul>
								<h3 className="font-medium">exercices :</h3>
								<ul className="list-disc list-inside space-y-1">
									{module.programme?.map((module) =>
										module?.exercises?.map((submodule, i) => (
											<li key={i}>
												{module.exercises}
											</li>
										))
									)}
								</ul>
							</div>
						)}
						{module.exercises && (
							<div>
								<h3 className="font-medium">Exercices :</h3>
								<ul className="list-disc list-inside space-y-1">
									{module.exercises.map((ex, j) => (
										<li key={j}>{ex}</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</details>
			))}
		</div>
	);
};

const Section = ({ title, children }) => (
	<section className="space-y-4">
		<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
		{children}
	</section>
);

function normalizeAndEncodeUrl(url) {
	const decomposed = url.normalize('NFD');
	return encodeURI(decomposed);
}

const CursusDetailPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const cursus = useSelector((state) => state.front.cursus.data).find(
		(formation) => {
			return formation._id === id;
		}
	);
	const [booking, setBooking] = useState(false);




	if (!cursus) return <LoadingSkeleton />;

	const {
		Title: title,
		tagline,
		Description: description,
		Rating: rating = 0,
		Objectifs: objectives = [],
		Prérequis: prerequisites = [],
		Modalités: modalities,
		Content: programme = [],
		Image: image,
	} = cursus;

	const pdcLink = `https://wavefilesystem.s3.eu-west-3.amazonaws.com/cours/${id}.pdf`;

	return (
		<motion.main
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="pb-24"
		>
			{booking && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					onClick={() => setBooking(false)}
				>
					<BookingPage formation={cursus} setBooking={setBooking} />
				</div>
			)}

			{/* HERO */}
			<div className="relative w-full h-64 md:h-96 overflow-hidden">
				{image && (
					<img
						src={image}
						alt={title}
						className="absolute inset-0 w-full h-full object-cover"
					/>
				)}
				<div className="absolute inset-0 bg-black/50" />
				<div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
					<h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
						{title}
					</h1>
					{tagline && <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{tagline}</p>}
					<div className="mt-6 flex flex-wrap gap-4 text-sm md:text-base text-gray-200">
						<span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
							⭐ {rating}/5
						</span>
					</div>
				</div>
			</div>

			{/* BREADCRUMB */}
			<nav className="max-w-7xl mx-auto px-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
				<ol className="flex items-center space-x-2">
					<li>
						<Link to="/cursus" className="hover:text-blue-600 dark:hover:text-blue-400">
							Cursus
						</Link>
					</li>
					<li>/</li>
					<li className="text-gray-800 dark:text-gray-200 font-medium">{title}</li>
				</ol>
			</nav>

			<div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-12">
				{/* MAIN COLUMN */}
				<div className="flex-1 space-y-12">
					<Section title="Description">
						<p className="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
							{description}
						</p>
					</Section>

					{objectives.length > 0 && (
						<Section title="Objectifs pédagogiques">
							<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
								{objectives.map((obj, idx) => (
									<li key={idx}>{obj}</li>
								))}
							</ul>
						</Section>
					)}

					{prerequisites.length > 0 && (
						<Section title="Prérequis">
							<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
								{prerequisites.map((pre, idx) => (
									<li key={idx}>{pre}</li>
								))}
							</ul>
						</Section>
					)}

					<Section title="Programme détaillé">
						{programme.length ? <SkillAccordion programme={programme} /> : <p className="text-gray-500">Programme à venir…</p>}
					</Section>

					{modalities && (
						<Section title="Modalités, méthodes et moyens pédagogiques">
							<p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
								{modalities}
							</p>
						</Section>
					)}
				</div>

				{/* SIDEBAR */}
				<aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24 self-start">
					<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm space-y-6">
						<div className="flex items-center space-x-2 text-lg">
							<span role="img" aria-label="star" className="text-yellow-500">
								⭐
							</span>
							<span className="font-medium text-gray-900 dark:text-gray-100">{rating}/5</span>
						</div>
						<button
							onClick={() => setBooking(true)}
							className="block w-full text-center py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors cursor-pointer"
						>
							S'inscrire maintenant
						</button>
						{pdcLink && (
							<a
								href={normalizeAndEncodeUrl(pdcLink)}
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full text-center py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-medium transition-colors"
							>
								Télécharger le programme (PDF)
							</a>
						)}
					</div>
				</aside>
			</div>
		</motion.main>
	);
};

export default CursusDetailPage;
