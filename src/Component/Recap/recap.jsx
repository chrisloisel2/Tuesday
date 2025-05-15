import React, { useRef, useState } from 'react';
import { usePDF } from 'react-to-pdf';

const FormationComponent = () => {
	const { toPDF, targetRef } = usePDF({ filename: 'details-formation.pdf' });

	const [formations] = useState([
		{
			id: "1",
			titre: "Web Scraping",
			dates: "28-31 juillet, 1 août",
			lieu: "SQY 26.1",
			formateur: "Adam",
			modalite: "Présentiel",
			programme: [
				"Introduction au web scraping",
				"Outils et frameworks",
				"Bonnes pratiques",
				"Cas pratiques",
			],
			objectifs: [
				"Maîtriser les techniques de scraping",
				"Extraire des données structurées",
				"Automatiser la collecte",
			],
		},
		{
			id: "2",
			titre: "Hadoop/Spark",
			dates: "30 juin - 4 juillet",
			lieu: "PRS 25.3",
			formateur: "Redouane",
			modalite: "Présentiel",
			programme: [
				"Architecture Hadoop",
				"Ecosystème Spark",
				"Traitement distribué",
				"Optimisation",
			],
			objectifs: [
				"Comprendre le Big Data",
				"Manipuler des datasets massifs",
				"Développer des jobs Spark",
			],
			prerequis: ["Bases en Python", "Notions de SQL"],
		},
		{
			id: "3",
			titre: "Suivi mémoire",
			dates: "30 juin",
			lieu: "MLV 25.1",
			formateur: "Christopher",
			modalite: "Présentiel",
			programme: [
				"Revue du plan",
				"Méthodologie",
				"Feedback personnalisé",
				"Prochaines étapes",
			],
			objectifs: [
				"Valider l'avancement",
				"Identifier les points d'amélioration",
				"Définir le calendrier",
			],
		}
	]);

	const [selectedFormation, setSelectedFormation] = useState(null);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des Formations</h1>

				<div className="flex flex-col md:flex-row gap-6">
					{/* Liste des formations */}
					<div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
						<h2 className="text-xl font-semibold text-gray-700 mb-4">Liste des formations</h2>
						<ul className="space-y-2">
							{formations.map((formation) => (
								<li
									key={formation.id}
									onClick={() => setSelectedFormation(formation)}
									className={`p-3 rounded cursor-pointer transition-colors ${selectedFormation?.id === formation.id
										? 'bg-blue-100 border-l-4 border-blue-500'
										: 'hover:bg-gray-100'
										}`}
								>
									<h3 className="font-medium text-gray-800">{formation.titre}</h3>
									<p className="text-sm text-gray-500">
										{formation.dates} • {formation.formateur}
									</p>
								</li>
							))}
						</ul>
					</div>

					{/* Détails de la formation */}
					<div className="w-full md:w-2/3">
						{selectedFormation ? (
							<div className="bg-white rounded-lg shadow overflow-hidden">
								<div ref={targetRef} className="p-6">
									{/* En-tête */}
									<div className="border-b pb-4 mb-6">
										<h2 className="text-2xl font-bold text-gray-800">{selectedFormation.titre}</h2>
										<div className="grid grid-cols-2 gap-4 mt-4 text-sm">
											<div>
												<p className="text-gray-500">Dates</p>
												<p className="font-medium">{selectedFormation.dates}</p>
											</div>
											<div>
												<p className="text-gray-500">Lieu</p>
												<p className="font-medium">{selectedFormation.lieu}</p>
											</div>
											<div>
												<p className="text-gray-500">Formateur</p>
												<p className="font-medium">{selectedFormation.formateur}</p>
											</div>
											<div>
												<p className="text-gray-500">Modalité</p>
												<p className="font-medium">{selectedFormation.modalite}</p>
											</div>
										</div>
									</div>

									{/* Contenu */}
									<div className="space-y-6">
										{/* Objectifs */}
										<div>
											<h3 className="text-lg font-semibold text-gray-800 mb-2">Objectifs</h3>
											<ul className="list-disc pl-5 space-y-1">
												{selectedFormation.objectifs.map((obj, i) => (
													<li key={i} className="text-gray-700">{obj}</li>
												))}
											</ul>
										</div>

										{/* Prérequis */}
										{selectedFormation.prerequis && (
											<div>
												<h3 className="text-lg font-semibold text-gray-800 mb-2">Prérequis</h3>
												<ul className="list-disc pl-5 space-y-1">
													{selectedFormation.prerequis.map((req, i) => (
														<li key={i} className="text-gray-700">{req}</li>
													))}
												</ul>
											</div>
										)}

										{/* Programme */}
										<div>
											<h3 className="text-lg font-semibold text-gray-800 mb-2">Programme</h3>
											<ol className="list-decimal pl-5 space-y-2">
												{selectedFormation.programme.map((item, i) => (
													<li key={i} className="text-gray-700 font-medium">{item}</li>
												))}
											</ol>
										</div>
									</div>
								</div>

								{/* Bouton de téléchargement */}
								<div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
									<button
										onClick={() => toPDF()}
										className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
										</svg>
										Télécharger le PDF
									</button>
								</div>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow p-8 text-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<h3 className="mt-4 text-lg font-medium text-gray-700">Aucune formation sélectionnée</h3>
								<p className="mt-1 text-gray-500">Sélectionnez une formation dans la liste pour voir les détails</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormationComponent;
