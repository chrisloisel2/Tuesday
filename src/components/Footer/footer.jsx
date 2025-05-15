import {
	FaLinkedin,
	FaEnvelope,
	FaPhoneAlt,
	FaMapMarkerAlt,
	FaBookOpen,
	FaLightbulb
} from "react-icons/fa";
import { motion } from "framer-motion";

function FooterSection() {
	return (
		<motion.footer
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="bg-opacity-0  rounded-2xl  p-16 grid grid-cols-1 md:grid-cols-3 gap-12"
		>
			<div className="space-y-6">
				<h2 className="text-3xl font-bold text-[#AEEFFF]">Ressources Gratuites</h2>
				<p className="text-[#E8F9FF] text-base flex items-center">
					<FaBookOpen className="mr-3 text-[#AEEFFF]" />
					Accédez à notre bibliothèque de guides, e-books et tutoriels pour approfondir vos connaissances.
				</p>
				<p className="text-[#E8F9FF] text-base flex items-center">
					<FaLightbulb className="mr-3 text-[#AEEFFF]" />
					Découvrez des astuces et conseils de nos experts pour réussir dans le domaine numérique.
				</p>
			</div>

			<div className="space-y-6">
				<h3 className="text-2xl font-semibold text-[#AEEFFF]">Nous Contacter</h3>
				<p className="flex items-center text-[#E8F9FF]">
					<FaMapMarkerAlt className="mr-3 text-[#AEEFFF]" /> 76 boulevard de la Libération, Vincennes
				</p>
				<p className="flex items-center text-[#E8F9FF]">
					<FaPhoneAlt className="mr-3 text-[#AEEFFF]" /> +33 7 69 06 90 96
				</p>
				<p className="flex items-center text-[#E8F9FF]">
					<FaEnvelope className="mr-3 text-[#AEEFFF]" /> contact@Skylonis.com
				</p>
			</div>

			<div className="space-y-6 text-center">
				<h3 className="text-2xl font-semibold text-[#AEEFFF]">Réseaux Sociaux</h3>
				<motion.a
					href="https://www.linkedin.com/showcase/skylonis/"
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.2 }}
					className="inline-flex items-center justify-center text-[#E8F9FF] hover:text-[#AEEFFF] transition"
				>
					<FaLinkedin className="text-5xl" />
					<span className="ml-4 text-xl font-semibold">LinkedIn</span>
				</motion.a>
			</div>
			<div className="text-sm text-[#6B8BA4] pt-6 border-t border-[#6B8BA4] col-start-1 col-span-full text-center">
				© {new Date().getFullYear()} Skylonis. Tous droits réservés.
			</div>
		</motion.footer>
	);
}

export default FooterSection;
