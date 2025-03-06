import React, { useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import Prism from 'prismjs';
import 'reveal.js/dist/reveal.css';
import './custom-reveal-IPSSI.css';
import './custom-reveal-IB.css';
import './custom-reveal-Ascent.css';
import './custom-reveal-Skylonis.css';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-elixir';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-coffeescript';
import { useParams } from 'react-router-dom';

const RevealMarkdown = () => {
	const { urlId, templateId } = useParams();
	const url = `https://wavefilesystem.s3.eu-west-3.amazonaws.com/others/${urlId}`;

	const revealRef = useRef(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (revealRef.current) {
			setIsReady(true);
		}
	}, []);

	useEffect(() => {
		if (isReady) {
			Reveal.initialize({
				plugins: [Markdown, Notes],
				markdown: {
					separator: '^---$',
					separatorVertical: '^--$',
					notesSeparator: '^Note:',
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

			// Appliquer des styles spécifiques aux titres de section
			const slides = document.querySelectorAll(".reveal .slides section");
			slides.forEach((slide) => {
				if (
					slide.children.length === 1 &&
					slide.querySelector("h1") &&
					slide.textContent.trim()
				) {
					slide.classList.add("title-only");
				}
			});

			// Gestion de l'impression PDF
			if (window.location.href.includes('?print-pdf')) {
				setTimeout(() => {
					window.print();
				}, 1000);
			}
		}

		return () => {
			if (isReady) {
				Reveal.destroy();
			}
		};
	}, [isReady, url]);

	return (
		<div ref={revealRef} className={`reveal ${templateId}`}>
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
