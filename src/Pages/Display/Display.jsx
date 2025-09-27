import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { unwrapArray } from "../../services/catalogAdapters";
import { useAuth } from "../../hooks/useAuth";
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
        const navigate = useNavigate();
        const { user: currentUser, logout } = useAuth();
        const userBoard = useMemo(() => {
                if (!currentUser?.boardUrl) {
                        return null;
                }

                return {
                        name: currentUser.boardLabel ?? "Tableau Monday",
                        url: currentUser.boardUrl,
                };
        }, [currentUser]);
        const envBoards = useMemo(() => (userBoard ? [] : parseBoards(process.env.REACT_APP_MONDAY_BOARDS)), [userBoard]);
        const [boards, setBoards] = useState([]);
        const [activeBoard, setActiveBoard] = useState(null);
        const [loading, setLoading] = useState(true);
        const [statusMessage, setStatusMessage] = useState("");
        const [error, setError] = useState("");
        const userInitials = useMemo(() => {
                if (!currentUser?.username) {
                        return "US";
                }

                const sanitized = currentUser.username.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g, " ").trim();
                if (!sanitized) {
                        return currentUser.username.slice(0, 2).toUpperCase();
                }

                const tokens = sanitized.split(/\s+/u);
                const first = tokens[0]?.[0] ?? "U";
                const lastToken = tokens[tokens.length - 1] ?? tokens[0];
                const second = lastToken?.[tokens.length > 1 ? 0 : 1] ?? lastToken?.[0] ?? "S";

                return `${first}${second}`.toUpperCase();
        }, [currentUser]);
        const handleLogout = useCallback(() => {
                logout();
                navigate("/login");
        }, [logout, navigate]);

        const handleLogout = useCallback(() => {
                logout();
                navigate("/login");
        }, [logout, navigate]);

        useEffect(() => {
                if (!currentUser) {
                        setBoards([]);
                        setActiveBoard(null);
                        setStatusMessage("");
                        setError("");
                        setLoading(false);
                        return;
                }

                if (userBoard) {
                        setBoards((existingBoards) => {
                                if (existingBoards.length === 1 && existingBoards[0].url === userBoard.url) {
                                        return existingBoards;
                                }
                                return [userBoard];
                        });
                        setActiveBoard((current) => {
                                if (current && current.url === userBoard.url) {
                                        return current;
                                }
                                return userBoard;
                        });
                        setStatusMessage("");
                        setError("");
                        setLoading(false);
                        return;
                }

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
        }, [currentUser, envBoards, userBoard]);

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

        if (!currentUser) {
                return (
                        <div className="display-empty">
                                <MdOutlineDashboardCustomize size={56} />
                                <p>Vous devez être connecté pour consulter vos tableaux Monday.</p>
                                <p>
                                        <Link to="/login" className="display-button display-button--primary">
                                                Se connecter
                                        </Link>
                                </p>
                        </div>
                );
        }

        const showSidebar = !userBoard;
        const showStatus = Boolean(statusMessage || error);

        if (!activeBoard && !loading && !userBoard) {
                return (
                        <div className="display-empty">
                                <MdOutlineDashboardCustomize size={56} />
                                <p>Aucun tableau Monday n'est disponible pour le moment.</p>
                                {statusMessage && <p>{statusMessage}</p>}
                                {error && <p className="display-text-error">{error}</p>}
                        </div>
                );
        }

        return (
                <div className="display-layout">
                        <button type="button" className="display-logout-button" onClick={handleLogout}>
                                Se déconnecter
                        </button>
                        {!userBoard && (
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
                        )}
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
                                ) : userBoard ? (
                                        <div className="display-empty">
                                                <MdOutlineDashboardCustomize size={56} />
                                                <p>
                                                        {loading
                                                                ? "Chargement de votre tableau Monday…"
                                                                : "Impossible de charger votre tableau Monday personnel pour le moment."}
                                                </p>
                                        </div>
                                ) : (
                                        <div className="display-empty">
                                                <MdOutlineDashboardCustomize size={56} />
                                                <p>Veuillez sélectionner un tableau Monday.</p>

                                        </div>
                                </div>
                                <button type="button" className="display-button display-button--ghost" onClick={handleLogout}>
                                        <FiLogOut aria-hidden="true" />
                                        <span>Se déconnecter</span>
                                </button>
                        </header>

                        <div className="display-shell">
                                {showSidebar && (
                                        <aside className="display-shell__sidebar" aria-label="Tableaux disponibles">
                                                <div className="display-panel">
                                                        <div className="display-panel__header">
                                                                <h2>Tableaux Monday</h2>
                                                                {loading && <span className="display-tag">Chargement…</span>}
                                                        </div>
                                                        {showStatus && (
                                                                <div className="display-panel__alerts">
                                                                        {statusMessage && (
                                                                                <span className="display-tag display-tag--info">{statusMessage}</span>
                                                                        )}
                                                                        {error && (
                                                                                <span className="display-tag display-tag--danger">{error}</span>
                                                                        )}
                                                                </div>
                                                        )}
                                                        <ul className="display-board-list">
                                                                {boards.map((board) => {
                                                                        const isActive = activeBoard && activeBoard.url === board.url;

                                                                        return (
                                                                                <li key={board.url}>
                                                                                        <button
                                                                                                type="button"
                                                                                                onClick={() => setActiveBoard(board)}
                                                                                                className={
                                                                                                        isActive
                                                                                                                ? "display-button display-button--primary"
                                                                                                                : "display-button"
                                                                                                }
                                                                                        >
                                                                                                {board.name}
                                                                                        </button>
                                                                                </li>
                                                                        );
                                                                })}
                                                        </ul>
                                                </div>
                                        </aside>
                                )}

                                <main className="display-shell__content">
                                        <section className="display-panel display-panel--stretch">
                                                <header className="display-panel__header display-panel__header--content">
                                                        <div>
                                                                <p className="display-subtitle">Tableau actif</p>
                                                                <h1 className="display-title">
                                                                        {activeBoard?.name ?? userBoard?.name ?? "Tableau Monday"}
                                                                </h1>
                                                        </div>
                                                        {!userBoard && boards.length > 1 && (
                                                                <span className="display-tag display-tag--neutral">
                                                                        {boards.length} tableaux
                                                                </span>
                                                        )}
                                                </header>

                                                {showStatus && userBoard && (
                                                        <div className="display-panel__alerts">
                                                                {statusMessage && (
                                                                        <span className="display-tag display-tag--info">{statusMessage}</span>
                                                                )}
                                                                {error && (
                                                                        <span className="display-tag display-tag--danger">{error}</span>
                                                                )}
                                                        </div>
                                                )}

                                                {activeBoard ? (
                                                        <motion.div
                                                                key={activeBoard.url}
                                                                initial={{ opacity: 0, y: 16 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.35 }}
                                                                className="display-frame"
                                                        >
                                                                <iframe
                                                                        src={activeBoard.url}
                                                                        title={activeBoard.name}
                                                                        allow="fullscreen"
                                                                        loading="lazy"
                                                                />
                                                        </motion.div>
                                                ) : (
                                                        <div className="display-placeholder">
                                                                <MdOutlineDashboardCustomize size={56} />
                                                                <p>
                                                                        {loading
                                                                                ? "Chargement de votre tableau Monday…"
                                                                                : "Impossible de charger un tableau Monday pour le moment."}
                                                                </p>
                                                        </div>
                                                )}
                                        </section>
                                </main>
                        </div>
                </div>
        );
};

export default Display;
