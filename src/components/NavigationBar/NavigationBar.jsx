import { motion } from "framer-motion";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationBar() {
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
			<a
				className="text-2xl font-bold text-[#AEEFFF] flex items-center cursor-pointer"
				href="/"
			>
				<img src={logo} className="h-12" alt="Logo" />
				Skylonis
			</a>
			<ul className="flex space-x-8 text-lg">
				<Link
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					// onClick={() => navigate("/formations")}
					to="/formations"
				>
					Formations
				</Link>
				<Link
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					// onClick={() => navigate("/cursus")}
					to="/cursus"
				>
					Cursus
				</Link>
				<Link
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					// onClick={() => navigate("/about")}
					to="/about"
				>
					A propos
				</Link>
				<Link
					className="hover:text-[#AEEFFF] transition cursor-pointer"
					// onClick={() => navigate("/contact")}
					to="/contact"
				>
					Contact
				</Link>
			</ul>
			<Button
				className="bg-[#AEEFFF] text-[#1A2B3C] px-6 py-2 rounded-xl hover:bg-[#E8F9FF] transition"
				onClick={() => window.location.href = "/login"}
			>
				Connexion
			</Button>
		</motion.nav>
	);
}

export default NavigationBar;
