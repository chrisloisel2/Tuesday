import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";


function NavigationBar() {
	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="w-full flex justify-between items-center py-6 px-12 bg-[#6B8BA4] bg-opacity-30 backdrop-blur-lg  shadow-lg fixed top-0  z-50  text-white"
		>
			<h1 className="text-2xl font-bold text-[#AEEFFF]">Skylonis</h1>
			<ul className="flex space-x-8 text-lg">
				<li className="hover:text-[#AEEFFF] transition cursor-pointer">
					<a href="/" >Accueil</a></li>
				<li className="hover:text-[#AEEFFF] transition cursor-pointer">
					<a href="/formations" >Formations</a>
				</li>
				<li className="hover:text-[#AEEFFF] transition cursor-pointer">
					<a href="/cursus" >Cursus</a>
				</li>
				<li className="hover:text-[#AEEFFF] transition cursor-pointer">
					<a href="/about" >A propos</a>
				</li>
				<li className="hover:text-[#AEEFFF] transition cursor-pointer">
					<a href="/contact" >Contact</a></li>
			</ul>
			<Button className="bg-[#AEEFFF] text-[#1A2B3C] px-6 py-2 rounded-xl hover:bg-[#E8F9FF] transition"
			>
				Connexion
			</Button>
		</motion.nav >
	);
}

export default NavigationBar;
