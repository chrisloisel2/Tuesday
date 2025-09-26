import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { unwrapArray } from "../../services/catalogAdapters";
import "./Display.css";

const parseBoards = (raw) => {
        if (!raw) return [];

        return raw
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean)
                .map((entry) => {
                        const [label, url] = entry.split("|");
                        return {
                                name: (label ?? url)?.trim(),
                                url: (url ?? label)?.trim(),
                        };
                })
                .filter((board) => /^https?:\/\//.test(board.url ?? ""));
};

const normalizeBoard = (item) => {
        if (!item) return null;
        const url =
                item.url ??
                item.embedUrl ??
                item.embed_url ??
                item.iframe ??
                item.src ??
                item.link ??
                item.href ??
                null;
        if (!url || !/^https?:\/\//.test(url)) return null;
        const name =
                item.name ??
                item.title ??
                item.label ??
                item.nom ??
                item.id ??
                "Tableau Monday";
        return {
                name,
                url,
        };
};

const FALLBACK_BOARDS = [
        {
                name: "Exemple de roadmap",
                url: "https://embed.monday.com/embed/boards/1234567890?view=timeline",
        },
];

const Display = () => {
        const envBoards = useMemo(() => parseBoards(process.env.REACT_APP_MONDAY_BOARDS), []);
        const [boards, setBoards] = useState([]);
        const [activeBoard, setActiveBoard] = useState(null);
        const [loading, setLoading] = useState(true);
        const [statusMessage, setStatusMessage] = useState("");
        const [error, setError] = useState("");

        useEffect(() => {
                const controller = new AbortController();
                const endpoint = process.env.REACT_APP_MAKE_DISPLAY_URL;

                const applyFallback = (message = "") => {
                        const fallback = envBoards.length ? envBoards : FALLBACK_BOARDS;
                        if (message) setStatusMessage(message);
                        setBoards(fallback);
                        setActiveBoard(fallback[0] ?? null);
                        setLoading(false);
                };

                if (!endpoint) {
                        applyFallback("Tableaux chargés depuis la configuration locale.");
                        return () => controller.abort();
                }

                const fetchBoards = async () => {
                        try {
                                setLoading(true);
                                const { data } = await axios.get(endpoint, { signal: controller.signal });
                                const normalized = unwrapArray(data)
                                        .map((item) => normalizeBoard(item))
                                        .filter(Boolean);

                                if (!normalized.length) {
                                        throw new Error("Aucun tableau retourné par Make");
                                }

                                setBoards(normalized);
                                setActiveBoard(normalized[0] ?? null);
                                setStatusMessage("");
                                setError("");
                        } catch (err) {
                                console.error("Erreur Make display", err);
                                setError("Impossible de récupérer les tableaux Monday pour le moment.");
                                applyFallback("Affichage des tableaux configurés localement.");
                        } finally {
                                setLoading(false);
                        }
                };

                fetchBoards();

                return () => {
                        controller.abort();
                };
        }, [envBoards]);

        useEffect(() => {
                if (!boards.length) {
                        setActiveBoard(null);
                        return;
                }
                setActiveBoard((current) => {
                        if (current && boards.some((board) => board.url === current.url)) {
                                return current;
                        }
                        return boards[0];
                });
        }, [boards]);

        if (!activeBoard && !loading) {
                return (
                        <div className="display-empty">
                                <MdOutlineDashboardCustomize size={56} />
                                <p>Aucun tableau Monday n'est disponible pour le moment.</p>
                                {statusMessage && <p>{statusMessage}</p>}
                                {error && <p className="error">{error}</p>}
                        </div>
                );
        }

        return (
                <div className="display-layout">
                        <aside className="display-sidebar">
                                <h2>Tableaux Monday</h2>
                                {loading && (
                                        <p className="display-status">Chargement des tableaux…</p>
                                )}
                                {error && <p className="display-error">{error}</p>}
                                {statusMessage && <p className="display-status">{statusMessage}</p>}
                                <ul>
                                        {boards.map((board) => (
                                                <li key={board.url}>
                                                        <button
                                                                type="button"
                                                                onClick={() => setActiveBoard(board)}
                                                                className={
                                                                        activeBoard && activeBoard.url === board.url
                                                                                ? "display-board-button active"
                                                                                : "display-board-button"
                                                                }
                                                        >
                                                                {board.name}
                                                        </button>
                                                </li>
                                        ))}
                                </ul>
                        </aside>
                        <main className="display-content">
                                {activeBoard ? (
                                        <motion.div
                                                key={activeBoard.url}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4 }}
                                                className="display-iframe-wrapper"
                                        >
                                                <iframe
                                                        src={activeBoard.url}
                                                        title={activeBoard.name}
                                                        allow="fullscreen"
                                                        loading="lazy"
                                                />
                                        </motion.div>
                                ) : (
                                        <div className="display-empty">
                                                <MdOutlineDashboardCustomize size={56} />
                                                <p>Veuillez sélectionner un tableau Monday.</p>
                                        </div>
                                )}
                        </main>
                </div>
        );
};

export default Display;
