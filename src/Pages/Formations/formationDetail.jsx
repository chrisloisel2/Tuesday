import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";


import { getFormationByCustomId } from "../../Redux/FrontReducer";
import { Card, CardContent } from "@mui/material";

/**
 * Page détaillée de formation – v2
 * Inspirée des pages catégorie d'ib‑Formation, tout en restant centrée sur une seule formation.
 * Points clés :
 *  - Fil d'Ariane pour la navigation
 *  - Hero section avec titre & pitch
 *  - Image hero plein écran
 *  - Sidebar sticky (prix / rating / CTA)
 *  - Programme détaillé sous forme d'accordéons (nested <details>)
 *  - Aucune dépendance vers lucide‑react (flèches en unicode)
 */

const LoadingSkeleton = () => (
	<div className="container mx-auto flex flex-col items-center justify-center h-[60vh] space-y-3 animate-pulse">
		<div className="h-8 w-1/3 bg-muted rounded-md" />
		<div className="h-60 w-full max-w-3xl bg-muted rounded-lg" />
		<div className="h-4 w-1/2 bg-muted rounded-md" />
		<div className="h-12 w-full max-w-sm bg-muted rounded-md" />
	</div>
);

/**
 * Rendu récursif des compétences (3 niveaux max dans la structure actuelle).
 * Utilise <details>/<summary> pour permettre l'ouverture/fermeture, flèche unicode.
 */
const SkillAccordion = ({ node }) => {
	if (!node?.children?.length) return null;

	return (
		<div className="space-y-3">
			{node.children.map((child, idx) => (
				<details
					key={`${child.name}-${idx}`}
					className="group rounded-lg border border-border bg-muted/40 [&_summary::-webkit-details-marker]:hidden"
				>
					<summary className="cursor-pointer select-none p-3 flex items-center justify-between font-medium">
						<span>
							{child.name}
							{child.value != null && (
								<span className="text-muted-foreground"> ({child.value}/5)</span>
							)}
						</span>
						{/* flèche unicode qui pivote via group-open */}
						<span className="transition-transform group-open:rotate-180">▼</span>
					</summary>

					<div className="pl-4 pb-3 pt-1 space-y-2">
						{child.children && child.children.length > 0 ? (
							<SkillAccordion node={child} />
						) : (
							<ul className="list-disc list-inside space-y-1">
								{child.children?.map((leaf, i) => (
									<li key={i}>
										{leaf.link ? (
											<a
												href={leaf.link}
												target="_blank"
												rel="noopener noreferrer"
												className="underline hover:text-primary"
											>
												{leaf.name}
											</a>
										) : (
											leaf.name
										)}
										{leaf.value != null && (
											<span className="text-muted-foreground"> ({leaf.value}/5)</span>
										)}
									</li>
								))}
							</ul>
						)}
					</div>
				</details>
			))}
		</div>
	);
};

const FormationDetailPage = () => {
	const { customId } = useParams();
	const dispatch = useDispatch();
	const formation = useSelector((state) => state.front.formations.selectedFormation);

	useEffect(() => {
		dispatch(getFormationByCustomId(customId));
	}, [customId, dispatch]);

	if (!formation) return <LoadingSkeleton />;

	const formattedPrice = Number(formation.price).toLocaleString("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 0,
	});

	return (
		<motion.main
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="container max-w-6xl mx-auto pt-20 pb-24 px-4 text-[white] dark:bg-background"
		>
			{/* Breadcrumb */}
			<nav className="text-sm text-muted-foreground mb-6">
				<ol className="flex items-center space-x-2">
					<li>
						<Link to="/formations" className="hover:text-primary">
							Formations
						</Link>
					</li>
					<li>/</li>
					<li className="text-foreground font-medium">{formation.title}</li>
				</ol>
			</nav>

			{/* Hero */}
			<section className="text-center mb-12 max-w-4xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
					{formation.title}
				</h1>
				<p className="text-lg leading-relaxed text-muted-foreground">
					{formation.description}
				</p>
			</section>

			{/* Image */}
			<Card className="overflow-hidden mb-16 shadow-xl">
				<img
					src={formation.image}
					alt={formation.title}
					className="w-full h-80 sm:h-[28rem] object-cover"
				/>
			</Card>

			{/* Content layout */}
			<div className="flex flex-col-reverse lg:flex-row gap-12">
				{/* Main column */}
				<div className="flex-1 space-y-12">
					{/* Programme */}
					<section>
						<h2 className="text-2xl font-semibold mb-6">Programme détaillé</h2>
						{formation.children?.length ? (
							<SkillAccordion node={{ children: formation.children }} />
						) : (
							<p className="text-muted-foreground">Programme à venir…</p>
						)}
					</section>

					{/* Bonus section */}
					<section className="prose dark:prose-invert max-w-none">
						<h2>Pourquoi suivre cette formation&nbsp;?</h2>
						<p>
							Devenir autonome dans la création d’applications Angular modernes, mieux
							comprendre l’architecture front‑end et booster votre employabilité en maîtrisant
							un framework plébiscité par les entreprises.
						</p>
						<h3>Objectifs pédagogiques</h3>
						<ul>
							<li>Construire des composants réutilisables et testables</li>
							<li>Gérer l’état de votre application avec des patterns robustes</li>
							<li>Déployer une application optimisée pour la production</li>
						</ul>
					</section>
				</div>

				{/* Sidebar */}
				<aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24 self-start">
					<Card className="shadow-md">
						<CardContent className="p-6 space-y-6">
							<div className="flex items-center space-x-2">
								<span role="img" aria-label="star" className="text-yellow-500 text-lg">
									⭐
								</span>
								<span className="font-medium text-lg">{formation.rating}/5</span>
							</div>


							<div className="text-3xl font-bold text-primary">{formattedPrice}</div>

							<button asChild size="lg" className="w-full">
								<a href={formation.link} target="_blank" rel="noopener noreferrer">
									S'inscrire maintenant
								</a>
							</button>
						</CardContent>
					</Card>
				</aside>
			</div>
		</motion.main>
	);
};

export default FormationDetailPage;
