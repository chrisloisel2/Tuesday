import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaStar, FaStarHalf } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FormationOverview({ title, image, description, icon: Icon, onClick }) {
	const [loaded, setLoaded] = useState(false);
	const [optimizedImage, setOptimizedImage] = useState("");
	const imgRef = useRef();

	useEffect(() => {
		const optimized = `${image}?w=500&h=280&fit=cover&q=80`;
		setOptimizedImage(optimized);

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					const img = new Image();
					img.src = optimized;
					img.onload = () => setLoaded(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" }
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, [image]);

	return (
		<motion.div
			whileHover={{ scale: 1.005, rotate: 1 }}
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col rounded-3xl shadow-xl hover:shadow-3xl cursor-pointer backdrop-blur-lg border border-gray-700 justify-between max-h-[300px]"
			onClick={onClick}
			ref={imgRef}
		>
			<div className="relative">
				{!loaded && (
					<div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 animate-pulse" />
				)}
				<div
					className="w-full h-48 rounded-t-3xl bg-gray-800 flex items-center justify-center"
					style={{
						backgroundImage: loaded ? `url(${optimizedImage})` : "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			</div>

			<div className="bg-[#1A2B3C] min-w-full border-t rounded-b-3xl p-3">
				<h2 className="text-3xl font-extrabold text-[#AEEFFF] font-sans leading-snug">
					{title}
				</h2>
				<motion.div className="flex items-center justify-start space-x-1">
					<p className="text-lg text-white"> Vos avis :</p>
					{[...Array(4)].map((_, index) => (
						<FaStar key={index} className="text-[gold] text-1xl" />
					))}
					<FaStarHalf className="text-[gold] text-1xl" />
				</motion.div>
			</div>
		</motion.div>
	);
}

function FormationPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const formations = useSelector((state) => state.front.formations.data);
	const navigate = useNavigate();

	// Pré-chargement des premières images
	useEffect(() => {
		const preloadImages = () => {
			formations.slice(0, 5).forEach(formation => {
				const img = new Image();
				img.src = `${formation.image}?w=500&h=280&fit=cover&q=80`;
			});
		};

		const timer = setTimeout(preloadImages, 300);
		return () => clearTimeout(timer);
	}, [formations]);

	const filteredFormations = formations.filter((formation) =>
		formation.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white overflow-y-auto px-8 pt-16 flex flex-col items-center justify-start space-y-12 font-sans">
			<motion.div
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="w-full p-16 flex flex-col space-y-10 backdrop-blur-md h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C]"
			>
				<motion.h2
					initial={{ opacity: 0, y: -40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2] text-center"
				>
					Trouvez la formation idéale pour vous
				</motion.h2>
				<motion.input
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					type="text"
					placeholder="🔍 Rechercher une formation..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="p-5 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition w-full bg-gray-800 text-white shadow-lg"
				/>
				<p className="text-lg leading-relaxed text-gray-400 text-center">
					Découvrez notre catalogue complet de formations adaptées à tous les niveaux et domaines.
				</p>
				<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[100vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl p-8">
					{filteredFormations.map((formation) => (
						<FormationOverview
							key={formation.id}
							title={formation.title}
							description={formation.description}
							image={formation.image}
							icon={FaBookOpen}
							onClick={() => navigate(`/formation/${formation.customId}`)}
						/>
					))}
				</motion.div>
				{filteredFormations.length === 0 && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-gray-500 text-center text-lg"
					>
						❌ Aucune formation trouvée pour votre recherche.
					</motion.p>
				)}
			</motion.div>
		</div>
	);
}

export default FormationPage;
