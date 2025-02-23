import { motion } from "framer-motion";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationBar() {
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 200);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.nav
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8 }}
			className={`w-full flex justify-between items-center py-6 px-12 fixed top-0 z-50 text-white transition-all duration-500 ${isScrolled
				? "bg-[#6B8BA4] bg-opacity-30 backdrop-blur-lg shadow-lg"
				: "bg-transparent"
				}`}
		>
			<h1
				className="text-2xl font-bold text-[#AEEFFF] flex items-center cursor-pointer"
				onClick={() => navigate("/")}
			>
				<img src={logo} className="h-12" alt="Logo" />
				Skylonis
			</h1>
			<ul className="flex space-x-8 text-lg">
				<li
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					onClick={() => navigate("/formations")}
				>
					Formations
				</li>
				<li
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					onClick={() => navigate("/cursus")}
				>
					Cursus
				</li>
				<li
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					onClick={() => navigate("/about")}
				>
					A propos
				</li>
				<li
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					onClick={() => navigate("/contact")}
				>
					Contact
				</li>
			</ul>
			<Button
				className="bg-[#AEEFFF] text-[#1A2B3C] px-6 py-2 rounded-xl hover:bg-[#E8F9FF] transition"
				onClick={() => navigate("/login")}
			>
				Connexion
			</Button>
		</motion.nav>
	);
}

export default NavigationBar;
