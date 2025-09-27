import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
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

        const envBoards = useMemo(
                () => (userBoard ? [] : parseBoards(process.env.REACT_APP_MONDAY_BOARDS)),
                [userBoard],
        );

        const [boards, setBoards] = useState(userBoard ? [userBoard] : []);
        const [activeBoard, setActiveBoard] = useState(userBoard ?? null);
        const [loading, setLoading] = useState(!userBoard);
        const [statusMessage, setStatusMessage] = useState("");
        const [error, setError] = useState("");

        const handleLogout = useCallback(() => {
                logout();
                navigate("/login");
        }, [logout, navigate]);

        useEffect(() => {
                if (!currentUser) {
                        setBoards([]);
                        setActiveBoard(null);
                        setLoading(false);
                        setStatusMessage("");
                        setError("");
                        return;
                }

                if (userBoard) {
                        setBoards([userBoard]);
                        setActiveBoard(userBoard);
                        setLoading(false);
                        setStatusMessage("");
                        setError("");
                }
        }, [currentUser, userBoard]);

        useEffect(() => {
                if (!currentUser || userBoard) {
                        return undefined;
                }

                const controller = new AbortController();
                const endpoint = process.env.REACT_APP_MAKE_DISPLAY_URL;

                const applyBoards = (list, message = "") => {
                        setBoards(list);
                        setActiveBoard((current) => {
                                if (current && list.some((board) => board.url === current.url)) {
                                        return current;
                                }
                                return list[0] ?? null;
                        });
                        setStatusMessage(message);
                };

                if (!endpoint) {
                        const fallback = envBoards.length ? envBoards : FALLBACK_BOARDS;
                        applyBoards(
                                fallback,
                                envBoards.length
                                        ? "Tableaux chargés depuis la configuration locale."
                                        : "Affichage d'un tableau Monday d'exemple.",
                        );
                        setLoading(false);
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
                                setActiveBoard((current) => {
                                        if (current) {
                                                const found = normalized.find((board) => board.url === current.url);
                                                if (found) {
                                                        return found;
                                                }
                                        }
                                        return normalized[0] ?? null;
                                });
                                setStatusMessage("");
                                setError("");
                        } catch (err) {
                                console.error("Erreur Make display", err);
                                setError("Impossible de récupérer les tableaux Monday pour le moment.");
                                const fallback = envBoards.length ? envBoards : FALLBACK_BOARDS;
                                applyBoards(
                                        fallback,
                                        envBoards.length
                                                ? "Affichage des tableaux configurés localement."
                                                : "Affichage d'un tableau Monday d'exemple.",
                                );
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
                                        <Link to="/login" className="display-link">
                                                Se connecter
                                        </Link>
                                </p>
                        </div>
                );
        }

        const showStatus = Boolean(statusMessage || error);

        return (
                <div className="display-page">
                        <header className="display-header">
                                <div>
                                        <p className="display-greeting">Bonjour {currentUser?.username ?? "!"}</p>
                                        <h1 className="display-title">Tableau Monday</h1>
                                </div>
                                <div className="display-actions">
                                        {boards.length > 1 && (
                                                <select
                                                        className="display-select"
                                                        value={activeBoard?.url ?? ""}
                                                        onChange={(event) => {
                                                                const selected = boards.find(
                                                                        (board) => board.url === event.target.value,
                                                                );
                                                                setActiveBoard(selected ?? null);
                                                        }}
                                                >
                                                        {boards.map((board) => (
                                                                <option key={board.url} value={board.url}>
                                                                        {board.name}
                                                                </option>
                                                        ))}
                                                </select>
                                        )}
                                        <button type="button" className="display-logout" onClick={handleLogout}>
                                                Se déconnecter
                                        </button>
                                </div>
                        </header>

                        {showStatus && (
                                <div className="display-status">
                                        {statusMessage && <span className="display-status__info">{statusMessage}</span>}
                                        {error && <span className="display-status__error">{error}</span>}
                                </div>
                        )}

                        <main className="display-main">
                                {loading ? (
                                        <div className="display-empty">
                                                <MdOutlineDashboardCustomize size={56} />
                                                <p>Chargement de vos tableaux Monday…</p>
                                        </div>
                                ) : activeBoard ? (
                                        <iframe
                                                className="display-iframe"
                                                src={activeBoard.url}
                                                title={activeBoard.name}
                                                allow="fullscreen"
                                                loading="lazy"
                                        />
                                ) : (
                                        <div className="display-empty">
                                                <MdOutlineDashboardCustomize size={56} />
                                                <p>Aucun tableau Monday n'est disponible pour le moment.</p>
                                        </div>
                                )}
                        </main>
                </div>
        );
};

export default Display;
