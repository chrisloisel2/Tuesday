import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

import { authorizedUsers } from "../data/users";

const AuthContext = createContext(undefined);
const AUTH_STORAGE_KEY = "skylonis-auth-user";

const readStoredUser = () => {
        if (typeof window === "undefined") {
                return null;
        }

        const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

        if (!storedValue) {
                return null;
        }

        try {
                return JSON.parse(storedValue);
        } catch (error) {
                console.warn("Impossible de lire l'utilisateur stocké", error);
                return null;
        }
};

export function AuthProvider({ children }) {
        const [user, setUser] = useState(() => readStoredUser());

        useEffect(() => {
                if (typeof window === "undefined") {
                        return;
                }

                if (user) {
                        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
                } else {
                        window.localStorage.removeItem(AUTH_STORAGE_KEY);
                }
        }, [user]);

        const login = useCallback((username, password, overrides = {}) => {
                const match = authorizedUsers.find(
                        (allowedUser) => allowedUser.username === username && allowedUser.password === password,
                );

                if (match) {
                        const authenticatedUser = {
                                username: match.username,
                                boardUrl: overrides.boardUrl ?? match.boardUrl ?? null,
                                boardLabel: overrides.boardLabel ?? match.boardLabel ?? null,
                        };
                        setUser(authenticatedUser);
                        return { success: true, user: authenticatedUser };
                }

                return { success: false, error: "Identifiants incorrects. Veuillez réessayer." };
        }, []);

        const logout = useCallback(() => {
                setUser(null);
        }, []);

        const value = useMemo(
                () => ({
                        user,
                        login,
                        logout,
                }),
                [user, login, logout],
        );

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
        const context = useContext(AuthContext);

        if (!context) {
                throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
        }

        return context;
}
