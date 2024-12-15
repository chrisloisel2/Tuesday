import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import 'reveal.js/dist/reveal.css';
import './custom-reveal-IPSSI.css';
import './custom-reveal-IB.css';
import './custom-reveal-Ascent.css';
import './custom-reveal-Skylonis.css';
import { useParams } from 'react-router-dom';
import mermaid from 'mermaid';


const RevealMarkdown = () => {
	const { urlId, templateId } = useParams();
	const url = `https://wavefilesystem.s3.eu-west-3.amazonaws.com/others/${urlId}`;

	useEffect(() => {
		Reveal.initialize({
			plugins: [Markdown, Notes],
			markdown: {
				separator: '^---$',
				separatorVertical: '^--$',
				notesSeparator: '^Note:',
				// Retours à la ligne pour les fin de lignes
				smartypants: true,
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
			pdfSeparateFragments: true,
			hideAddressBar: true,
			pdfPageHeightOffset: 0,
			notes: false,
		});


		const slides = document.querySelectorAll(".reveal .slides section");
		slides.forEach((slide) => {
			if (
				slide.children.length === 1 &&
				slide.querySelector("h1") &&
				slide.textContent.trim()
			) {
				console.log("H1 UNIQUE");
				slide.classList.add("title-only");
			}
		});

		if (window.location.href.includes('?print-pdf')) {
			document.querySelectorAll('print-pdf').forEach((element) => {
				console.log('element', element);
			});

			setTimeout(() => {
				window.print();
			}, 1000);
		}

	}, [url]);

	return (
		<div className={"reveal " + templateId}>
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
