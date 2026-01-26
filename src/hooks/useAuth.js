import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const API_URL = "https://skylonis.com";
const AuthContext = createContext(undefined);
const AUTH_STORAGE_KEY = "skylonis-auth-user";

const readStoredUser = () => {
        if (typeof window === "undefined") return null;
        try {
                return JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY));
        } catch {
                return null;
        }
};

export function AuthProvider({ children }) {
        const [user, setUser] = useState(() => readStoredUser());

        useEffect(() => {
                if (user) {
                        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
                } else {
                        window.localStorage.removeItem(AUTH_STORAGE_KEY);
                }
        }, [user]);

        const login = useCallback(async (username, password) => {
                try {
                        const { data } = await axios.post(`${API_URL}/login`, { username, password });
                        if (data.success) {
                                setUser(data.user);
                                return { success: true, user: data.user };
                        }
                        return { success: false, error: "Identifiants incorrects." };
                } catch {
                        return { success: false, error: "Identifiants incorrects." };
                }
        }, []);

        const logout = useCallback(() => setUser(null), []);

        const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
        const context = useContext(AuthContext);

        if (!context) {
                throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
        }

        return context;
}
