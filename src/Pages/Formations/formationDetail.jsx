import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import BookingPage from "../Booking/BookingPage";
import {
        buildEndpointWithId,
        findFallbackFormation,
        normalizeFormation,
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

const FormationDetailPage = () => {
        const { customId } = useParams();
        const fallbackFormation = useMemo(() => findFallbackFormation(customId), [customId]);
        const [formation, setFormation] = useState(fallbackFormation ?? null);
        const [booking, setBooking] = useState(false);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
                const controller = new AbortController();
                const detailTemplate = process.env.REACT_APP_MAKE_FORMATION_DETAIL_URL;
                const listEndpoint = process.env.REACT_APP_MAKE_FORMATIONS_URL;

                if (!detailTemplate && !listEndpoint) {
                        setFormation(fallbackFormation ?? null);
                        setLoading(false);
                        if (!fallbackFormation) setError("Formation introuvable pour le moment.");
                        return () => controller.abort();
                }

                const fetchFromList = async () => {
                        const { data } = await axios.get(listEndpoint, { signal: controller.signal });
                        const match = unwrapArray(data)
                                .map((item) => normalizeFormation(item))
                                .find((item) => item && (item.customId === customId || item.id === customId));
                        if (!match) {
                                throw new Error("Formation introuvable");
                        }
                        setFormation(match);
                };

                const fetchDetail = async () => {
                        const url = buildEndpointWithId(detailTemplate, customId);
                        const { data } = await axios.get(url, { signal: controller.signal });
                        const payload = Array.isArray(data) ? data[0] : data;
                        const normalized = normalizeFormation(payload);
                        if (!normalized) {
                                throw new Error("Formation non valide");
                        }
                        setFormation(normalized);
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
                                console.error("Erreur Make formation detail", err);
                                setFormation(fallbackFormation ?? null);
                                setError("Impossible de charger cette formation pour le moment.");
                        } finally {
                                setLoading(false);
                        }
                };

                load();

                return () => {
                        controller.abort();
                };
        }, [customId, fallbackFormation]);

        if (loading) return <LoadingSkeleton />;
        if (!formation) {
                return (
                        <div className="min-h-[60vh] flex items-center justify-center text-center text-gray-400">
                                {error || "Formation introuvable."}
                        </div>
                );
        }

        const {
                title,
                tagline,
                description,
                image,
                rating = 0,
                duration,
                code,
                certification,
                price = 0,
                objectives,
                audience,
                prerequisites,
                modalities,
                programme,
                sessions,
                pdf,
        } = formation;

        const formattedPrice = price
                ? price.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                })
                : null;

        const pdcLink = pdf
                ? pdf
                : `https://wavefilesystem.s3.eu-west-3.amazonaws.com/cours/${normalizeAndEncodeUrl(customId)}.pdf`;

        return (
                <motion.main
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="pb-24"
                >
                        {booking && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setBooking(false)}>
                                        <BookingPage formation={formation} setBooking={setBooking} />
                                </div>
                        )}
                        <div className="relative w-full h-64 md:h-96 overflow-hidden">
                                {image && (
                                        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
                                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                                                {title}
                                        </h1>
                                        {tagline && (
                                                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{tagline}</p>
                                        )}
                                        <div className="mt-6 flex flex-wrap gap-4 text-sm md:text-base text-gray-200">
                                                {duration && (
                                                        <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                                                ⏱ {duration}
                                                        </span>
                                                )}
                                                {code && (
                                                        <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                                                📄 Code : {code}
                                                        </span>
                                                )}
                                                <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                                        ⭐ {rating}/5
                                                </span>
                                                {certification && (
                                                        <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                                                🎓 {certification}
                                                        </span>
                                                )}
                                        </div>
                                </div>
                        </div>

                        <nav className="max-w-7xl mx-auto px-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
                                <ol className="flex items-center space-x-2">
                                        <li>
                                                <Link to="/formations" className="hover:text-blue-600 dark:hover:text-blue-400">
                                                        Formations
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

                                        {objectives?.length > 0 && (
                                                <Section title="Objectifs pédagogiques">
                                                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                                                {objectives.map((obj, idx) => (
                                                                        <li key={idx}>{obj}</li>
                                                                ))}
                                                        </ul>
                                                </Section>
                                        )}

                                        {audience && (
                                                <Section title="Public visé">
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                                                {audience}
                                                        </p>
                                                </Section>
                                        )}

                                        {prerequisites?.length > 0 && (
                                                <Section title="Prérequis">
                                                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                                                {prerequisites.map((pre, idx) => (
                                                                        <li key={idx}>{pre}</li>
                                                                ))}
                                                        </ul>
                                                </Section>
                                        )}

                                        <Section title="Programme détaillé">
                                                {programme?.length ? (
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

                                        {sessions?.length > 0 && (
                                                <Section title="Prochaines sessions">
                                                        <ul className="space-y-3">
                                                                {sessions.map((session, idx) => (
                                                                        <li
                                                                                key={`${session.date}-${session.city}-${idx}`}
                                                                                className="flex flex-wrap gap-3 items-center text-gray-700 dark:text-gray-300"
                                                                        >
                                                                                {session.date && (
                                                                                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                                                                                                📅 {session.date}
                                                                                        </span>
                                                                                )}
                                                                                {session.city && (
                                                                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200">
                                                                                                📍 {session.city}
                                                                                        </span>
                                                                                )}
                                                                                {session.price && (
                                                                                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200">
                                                                                                💶 {session.price.toLocaleString("fr-FR", {
                                                                                                        style: "currency",
                                                                                                        currency: "EUR",
                                                                                                        minimumFractionDigits: 0,
                                                                                                })}
                                                                                        </span>
                                                                                )}
                                                                                {session.link && (
                                                                                        <a
                                                                                                href={session.link}
                                                                                                target="_blank"
                                                                                                rel="noreferrer"
                                                                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                                                                        >
                                                                                                S'inscrire
                                                                                        </a>
                                                                                )}
                                                                        </li>
                                                                ))}
                                                        </ul>
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
                                                {formattedPrice && (
                                                        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                                                {formattedPrice}
                                                        </div>
                                                )}
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

export default FormationDetailPage;
