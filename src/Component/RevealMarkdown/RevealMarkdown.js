import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './custom-reveal.css';
import { useParams } from 'react-router-dom';

const RevealMarkdown = () => {
	const { urlId, dwId } = useParams();
	const url = `https://wavefilesystem.s3.eu-west-3.amazonaws.com/others/${urlId}`;

	const exportToPDF = () => {
		if (!window.location.href.includes('?print-pdf')) {
			// Ajoute ?print-pdf seulement si absent
			window.location.href = `${window.location.href}?print-pdf`;
		} else {
			// Lance l'impression si ?print-pdf est déjà dans l'URL
			setTimeout(() => {
				window.print();
			}, 1000); // Délai pour permettre le rendu des styles
		}
	};

	useEffect(() => {
		console.log('RevealMarkdown', urlId, dwId, window.location.href);
		if (window.location.href.includes('?print-pdf')) {
			// Si ?print-pdf est déjà présent, lance l'impression directement
			setTimeout(() => {
				window.print();
			}, 1000); // Délai pour permettre le rendu
		} else if (dwId === 1) {
			// Sinon, prépare l'export PDF
			exportToPDF();
		}

		// Initialisation de Reveal.js
		Reveal.initialize({
			plugins: [Markdown, Notes],
			markdown: {
				separator: '^---$', // Séparateur pour diapositives horizontales
				separatorVertical: '^--$', // Séparateur pour diapositives verticales
				notesSeparator: '^Note:', // Séparateur pour notes
				// Mettre les retours a la ligne pour chaque fin de phrase
			},
			controls: true,
			progress: true,
			slideNumber: true,
			history: true,
			center: true,
			transition: 'slide',
			backgroundTransition: 'slide',
			pdfExport: true,
			pdfMaxPagesPerSlide: 1,
			pdfSeparateFragments: false,
			showNotes: false,
			width: 1920,
			height: 1080,
		});
	}, [dwId, url]);

	return (
		<div className="reveal">
			<div className="slides">
				<section
					data-markdown={url}
					data-separator="^---$"
					data-separator-vertical="^--$"
					data-separator-notes="^Note:"
				></section>
			</div>
		</div>
	);
};

export default RevealMarkdown;
