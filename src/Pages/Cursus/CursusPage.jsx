import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import BookingPage from "../Booking/BookingPage";
import {
        buildEndpointWithId,
        findFallbackCursus,
        normalizeCursus,
        unwrapArray,
} from "../../services/catalogAdapters";

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
                                                {module.objectives && module.objectives.length > 0 && (
                                                        <div>
                                                                <h3 className="font-medium">Objectifs :</h3>
                                                                <ul className="list-disc list-inside space-y-1">
                                                                        {module.objectives.map((obj, i) => (
                                                                                <li key={i}>{obj}</li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                )}

                                                {module.exercises && module.exercises.length > 0 && (
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
        const decomposed = url.normalize("NFD");
        return encodeURI(decomposed);
}

const CursusDetailPage = () => {
        const { id } = useParams();
        const fallbackCursus = useMemo(() => findFallbackCursus(id), [id]);
        const [cursus, setCursus] = useState(fallbackCursus ?? null);
        const [booking, setBooking] = useState(false);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
                const controller = new AbortController();
                const detailTemplate = process.env.REACT_APP_MAKE_CURSUS_DETAIL_URL;
                const listEndpoint = process.env.REACT_APP_MAKE_CURSUS_URL;

                if (!detailTemplate && !listEndpoint) {
                        setCursus(fallbackCursus ?? null);
                        setLoading(false);
                        if (!fallbackCursus) setError("Cursus introuvable pour le moment.");
                        return () => controller.abort();
                }

                const fetchFromList = async () => {
                        const { data } = await axios.get(listEndpoint, { signal: controller.signal });
                        const match = unwrapArray(data)
                                .map((item) => normalizeCursus(item))
                                .find((item) => item && (item.id === id || item.customId === id));
                        if (!match) {
                                throw new Error("Cursus introuvable");
                        }
                        setCursus(match);
                };

                const fetchDetail = async () => {
                        const url = buildEndpointWithId(detailTemplate, id);
                        const { data } = await axios.get(url, { signal: controller.signal });
                        const payload = Array.isArray(data) ? data[0] : data;
                        const normalized = normalizeCursus(payload);
                        if (!normalized) {
                                throw new Error("Cursus non valide");
                        }
                        setCursus(normalized);
                };

                const load = async () => {
                        try {
                                setLoading(true);
                                if (detailTemplate) {
                                        await fetchDetail();
                                } else if (listEndpoint) {
                                        await fetchFromList();
                                }
                                setError("");
                        } catch (err) {
                                console.error("Erreur Make cursus detail", err);
                                setCursus(fallbackCursus ?? null);
                                setError("Impossible de charger ce cursus pour le moment.");
                        } finally {
                                setLoading(false);
                        }
                };

                load();

                return () => {
                        controller.abort();
                };
        }, [id, fallbackCursus]);

        if (loading) return <LoadingSkeleton />;
        if (!cursus) {
                        return (
                                <div className="min-h-[60vh] flex items-center justify-center text-center text-gray-400">
                                        {error || "Cursus introuvable."}
                                </div>
                        );
        }

        const {
                title,
                tagline,
                description,
                rating = 0,
                objectives = [],
                prerequisites = [],
                modalities,
                programme = [],
                image,
        } = cursus;

        const pdcLink = `https://wavefilesystem.s3.eu-west-3.amazonaws.com/cours/${normalizeAndEncodeUrl(id)}.pdf`;

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
                                                {programme.length ? (
                                                        <SkillAccordion programme={programme} />
                                                ) : (
                                                        <p className="text-gray-500">Programme à venir…</p>
                                                )}
                                        </Section>

                                        {modalities && (
                                                <Section title="Modalités, méthodes et moyens pédagogiques">
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                                                {modalities}
                                                        </p>
                                                </Section>
                                        )}
                                </div>

                                <aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24 self-start">
                                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm space-y-6">
                                                <div className="flex items-center space-x-2 text-lg">
                                                        <span role="img" aria-label="star" className="text-yellow-500">
                                                                ⭐
                                                        </span>
                                                        <span className="font-medium text-gray-900 dark:text-gray-100">{rating}/5</span>
                                                </div>
                                                <button
                                                        type="button"
                                                        onClick={() => setBooking(true)}
                                                        className="w-full px-6 py-3 text-center rounded-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
                                                >
                                                        Planifier une séance pré-formation
                                                </button>
                                                <a
                                                        href={pdcLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="block text-center text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                        Télécharger le programme détaillé
                                                </a>
                                        </div>
                                </aside>
                        </div>
                </motion.main>
        );
};

export default CursusDetailPage;
