import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import { Button } from "../../components/ui/button";


function ContactSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto flex flex-col item-center justify-center space-y-20 pl-12 pr-12">
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]"
			>
				Contactez nous
			</motion.h2>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
				className="text-xl text-[#E8F9FF] max-w-4xl mx-auto"
			>
				Vous avez des questions, souhaitez collaborer ou en savoir plus sur nos formations ? Remplissez le formulaire ci-dessous, nous vous répondrons dans les plus brefs délais.
			</motion.p>

			<motion.form
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="bg-[#4AB3E2] bg-opacity-10 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto space-y-8"
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					<motion.div
						whileFocus={{ scale: 1.05 }}
						className="flex flex-col relative"
					>
						<FaUser className="absolute top-4 left-4 text-[#AEEFFF] text-xl" />
						<input
							type="text"
							placeholder="Votre nom"
							className="pl-12 p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
							required
						/>
					</motion.div>
					<motion.div
						whileFocus={{ scale: 1.05 }}
						className="flex flex-col relative"
					>
						<FaEnvelope className="absolute top-4 left-4 text-[#AEEFFF] text-xl" />
						<input
							type="email"
							placeholder="Votre adresse email"
							className="pl-12 p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
							required
						/>
					</motion.div>
				</div>
				<motion.div
					whileFocus={{ scale: 1.05 }}
					className="flex flex-col relative"
				>
					<FaCommentDots className="absolute top-4 left-4 text-[#AEEFFF] text-xl" />
					<input
						type="text"
						placeholder="Objet de votre message"
						className="pl-12 p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
						required
					/>
				</motion.div>
				<motion.div
					whileFocus={{ scale: 1.05 }}
					className="flex flex-col relative"
				>
					<textarea
						rows="5"
						placeholder="Votre message"
						className="p-4 rounded-lg bg-[#1A2B3C] text-[#E8F9FF] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition"
						required
					></textarea>
				</motion.div>
				<motion.div whileHover={{ scale: 1.1 }}>
					<Button className="bg-[#AEEFFF] text-[#1A2B3C] rounded-3xl px-16 py-5 text-xl shadow-2xl hover:bg-[#E8F9FF] transition">
						Envoyer
					</Button>
				</motion.div>
			</motion.form>
		</motion.section>
	);
}

export default ContactSection;
