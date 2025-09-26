import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
        FALLBACK_CURSUS,
        normalizeCursus,
        unwrapArray,
} from "../../services/catalogAdapters";

function CursusOverview({ title, description, icon: Icon, onClick }) {
        return (
                <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col bg-[#1A2B3C] p-8 rounded-3xl shadow-2xl space-y-4 cursor-pointer transition-all hover:shadow-3xl"
                        onClick={onClick}
                >
                        <Icon className="text-[#AEEFFF] text-4xl" />
                        <h2 className="text-3xl font-bold text-[#AEEFFF] font-sans">{title}</h2>
                        <p className="text-lg leading-relaxed text-gray-300">{description}</p>
                </motion.div>
        );
}

function Cursus() {
        const [searchTerm, setSearchTerm] = useState("");
        const [cursus, setCursus] = useState([]);
        const [loading, setLoading] = useState(true);
        const [statusMessage, setStatusMessage] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
                const controller = new AbortController();
                const endpoint = process.env.REACT_APP_MAKE_CURSUS_URL;

                const applyFallback = (message = "") => {
                        if (message) {
                                setStatusMessage(message);
                        }
                        setCursus(FALLBACK_CURSUS);
                        setLoading(false);
                };

                if (!endpoint) {
                        applyFallback("Catalogue affiché en mode statique (endpoint Make manquant).");
                        return () => controller.abort();
                }

                const fetchData = async () => {
                        try {
                                setLoading(true);
                                const { data } = await axios.get(endpoint, { signal: controller.signal });
                                const normalized = unwrapArray(data)
                                        .map((item) => normalizeCursus(item))
                                        .filter(Boolean);

                                if (!normalized.length) {
                                        throw new Error("Aucun cursus retourné par Make");
                                }

                                setCursus(normalized);
                                setStatusMessage("");
                                setError("");
                        } catch (err) {
                                console.error("Erreur Make cursus", err);
                                setError("Impossible de récupérer les cursus pour le moment.");
                                applyFallback("Affichage des données statiques en attendant la synchronisation API.");
                        } finally {
                                setLoading(false);
                        }
                };

                fetchData();

                return () => {
                        controller.abort();
                };
        }, []);

        const filteredCursus = cursus.filter((c) =>
                (c.title ?? "").toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
                <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto px-12 pt-12 flex flex-col items-center justify-center space-y-8 font-sans">
                        {loading && (
                                <div className="text-center text-[#AEEFFF] animate-pulse text-lg">
                                        Chargement des cursus…
                                </div>
                        )}
                        {!loading && error && (
                                <div className="text-center text-red-400 text-sm">{error}</div>
                        )}
                        <div className="flex flex-col md:flex-row gap-10 w-full h-full max-w-[85vw]">
                                <motion.div
                                        className="flex flex-col gap-12 p-12 w-full md:w-2/5 bg-[#1A2B3C] scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl shadow-2xl overflow-y-auto h-[85vh]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                >
                                        <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
                                                Cherchez le cursus qui vous convient
                                        </h2>
                                        <input
                                                type="text"
                                                placeholder="Rechercher un cursus"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="p-4 text-[black] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition w-full"
                                        />
                                        <p className="text-lg leading-relaxed text-gray-300">
                                                Découvrez notre large gamme de cursus, classés selon leur domaine
                                                d'expertise.
                                        </p>
                                        {statusMessage && (
                                                <p className="text-sm text-[#AEEFFF] bg-[#1a365d] bg-opacity-60 border border-[#AEEFFF]/40 rounded-xl px-4 py-2">
                                                        {statusMessage}
                                                </p>
                                        )}
                                        <ul className="flex flex-col gap-5 text-lg font-medium text-[#AEEFFF]">
                                                <button
                                                        onClick={() =>
                                                                setSearchTerm((current) =>
                                                                        current === "Développement Web"
                                                                                ? ""
                                                                                : "Développement Web"
                                                                )
                                                        }
                                                        className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
                                                >
                                                        Développement Web
                                                </button>
                                                <button
                                                        onClick={() =>
                                                                setSearchTerm((current) =>
                                                                        current === "Intelligence Artificielle"
                                                                                ? ""
                                                                                : "Intelligence Artificielle"
                                                                )
                                                        }
                                                        className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
                                                >
                                                        Intelligence Artificielle
                                                </button>
                                                <button
                                                        onClick={() =>
                                                                setSearchTerm((current) =>
                                                                        current === "Big Data" ? "" : "Big Data"
                                                                )
                                                        }
                                                        className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
                                                >
                                                        Big Data
                                                </button>
                                                <button
                                                        onClick={() =>
                                                                setSearchTerm((current) =>
                                                                        current === "DevOps" ? "" : "DevOps"
                                                                )
                                                        }
                                                        className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
                                                >
                                                        DevOps
                                                </button>
                                                <button
                                                        onClick={() =>
                                                                setSearchTerm((current) =>
                                                                        current === "Cybersécurité" ? "" : "Cybersécurité"
                                                                )
                                                        }
                                                        className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
                                                >
                                                        Cybersécurité
                                                </button>
                                        </ul>
                                </motion.div>

                                <div className="flex flex-col gap-12 bg-[#1A2B3C] p-12 scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl shadow-2xl overflow-y-auto h-[85vh] w-full md:w-4/5">
                                        {filteredCursus.map((cursusItem) => (
                                                <CursusOverview
                                                        key={cursusItem.id}
                                                        title={cursusItem.title}
                                                        description={cursusItem.description}
                                                        icon={FaCode}
                                                        onClick={() => navigate(`/cursus/${cursusItem.id}`)}
                                                />
                                        ))}
                                        {!loading && !filteredCursus.length && (
                                                <p className="text-gray-400 text-center">
                                                        Aucun cursus ne correspond à votre recherche.
                                                </p>
                                        )}
                                </div>
                        </div>
                </div>
        );
}

export default Cursus;
