import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
        const navigate = useNavigate();
        const { login, user } = useAuth();
        const [credentials, setCredentials] = useState({ username: "", password: "" });
        const [error, setError] = useState("");

        useEffect(() => {
                if (user) {
                        navigate("/display", { replace: true });
                }
        }, [user, navigate]);

        const handleChange = (event) => {
                const { name, value } = event.target;
                setCredentials((previous) => ({ ...previous, [name]: value }));
        };

        const handleSubmit = (event) => {
                event.preventDefault();
                const result = login(credentials.username, credentials.password);

                if (result.success) {
                        setError("");
                        navigate("/display");
                } else {
                        setError(result.error ?? "Identifiants invalides.");
                }
        };

        return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1C2E] to-[#1A2B3C] text-white px-4">
                        <form
                                onSubmit={handleSubmit}
                                className="w-full max-w-md bg-[#15253A] bg-opacity-80 backdrop-blur rounded-2xl shadow-xl p-8 space-y-6"
                        >
                                <div>
                                        <h1 className="text-3xl font-bold text-center">Connexion</h1>
                                        <p className="text-center text-[#AEEFFF] mt-2">
                                                Accédez à votre tableau Monday en renseignant vos identifiants.
                                        </p>
                                </div>

                                <label className="block">
                                        <span className="text-sm font-medium text-[#AEEFFF]">Identifiant</span>
                                        <input
                                                type="text"
                                                name="username"
                                                value={credentials.username}
                                                onChange={handleChange}
                                                className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0F1C2E] border border-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#AEEFFF]"
                                                placeholder="Votre identifiant"
                                                autoComplete="username"
                                                required
                                        />
                                </label>

                                <label className="block">
                                        <span className="text-sm font-medium text-[#AEEFFF]">Mot de passe</span>
                                        <input
                                                type="password"
                                                name="password"
                                                value={credentials.password}
                                                onChange={handleChange}
                                                className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0F1C2E] border border-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#AEEFFF]"
                                                placeholder="Votre mot de passe"
                                                autoComplete="current-password"
                                                required
                                        />
                                </label>

                                {error ? (
                                        <p className="text-sm text-red-400 text-center" role="alert">
                                                {error}
                                        </p>
                                ) : null}

                                <Button type="submit" className="w-full bg-[#AEEFFF] text-[#0F1C2E] font-semibold hover:bg-[#E8F9FF]">
                                        Se connecter
                                </Button>
                        </form>
                </div>
        );
}

export default LoginPage;
