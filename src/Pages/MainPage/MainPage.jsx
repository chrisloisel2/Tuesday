import { motion } from "framer-motion";
import {
	FaMobile,
	FaStar,
	FaUniversity,
	FaChalkboardTeacher,
	FaAward,
	FaLaptopCode,
	FaRobot,
	FaChartLine,
	FaBookOpen,
	FaLightbulb,
	FaHandsHelping,
	FaProjectDiagram,
	FaChartPie,
} from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchCursus, fetchFormation, resetAll } from "../../Redux/FrontReducer";
import { useEffect } from "react";

const COLORS = ["#AEEFFF", "#4AB3E2", "#1A2B3C", "#E8F9FF", "#6B8BA4"];

const teachingData = [
	{ name: "Apprentissage Pratique", value: 45, icon: <FaHandsHelping />, color: "#AE0E40" },
	{ name: "Projets Concrets", value: 25, icon: <FaProjectDiagram />, color: "#9A031E" },
	{ name: "Approfondissement Théorique", value: 15, icon: <FaBookOpen />, color: "#FB8B24" },
	{ name: "Innovation et Créativité", value: 10, icon: <FaLightbulb />, color: "#E36414" },
	{ name: "Suivi Personnalisé", value: 5, icon: <FaChartPie />, color: "#0F4C5C" },
];

export default function PresentationPage() {
	const dispatch = useDispatch();
	const formationStatus = useSelector((state) => state.front.formations.status);
	const cursusStatus = useSelector((state) => state.front.cursus.status);
	useEffect(() => {
		if (formationStatus === "idle") {
			dispatch(fetchFormation());
		}
		if (cursusStatus === "idle") {
			dispatch(fetchCursus());
		}
	}, [dispatch, formationStatus]);


	return (
		<>
			<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto space-y-40 pl-12 pr-12  pb-20">
				<HeroSection />
				<CoursesSection />
				<TeachingMethodsSection />
				<FormationsSection />
				<AboutSection />
				<ContactSection />
			</div>
		</>
	);
}

function HeroSection() {
	return (
		<>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<BackgroundNeuralNetwork />
				<div
					className="min-h-screen flex flex-col justify-center items-center text-center space-y-8 pt-40 relative z-10">

					<motion.h1
						initial={{ y: -50 }}
						animate={{ y: 0 }}
						transition={{ duration: 1 }}
						className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]"
					>
						Découvrez Nos Formations
					</motion.h1>
					<p className="text-xl text-[#E8F9FF] max-w-3xl">
						Skylonis propose des cursus innovants avec une pédagogie personnalisée, adaptée aux enjeux du numérique.
					</p>
					<motion.div whileHover={{ scale: 1.1 }}>
						<Button className="bg-[#AEEFFF] text-[#1A2B3C] rounded-3xl px-12 py-5 text-xl shadow-xl hover:bg-[#E8F9FF] transition z-100 cursor-pointer">
							Explorer Maintenant
						</Button>
					</motion.div>
				</div>
			</motion.section >
		</>
	);
}

function BackgroundNeuralNetwork() {
	const points = Array.from({ length: 40 }, () => ({
		x: Math.random() * 100 + "%",
		y: Math.random() * 100 + "%",
		color: COLORS[Math.floor(Math.random() * COLORS.length)],
	}));

	const filteredConnections = [];
	points.forEach((pointA, indexA) => {
		points.forEach((pointB, indexB) => {
			if (
				indexA < indexB &&
				Math.abs(parseFloat(pointA.x) - parseFloat(pointB.x)) < 20 &&
				Math.abs(parseFloat(pointA.y) - parseFloat(pointB.y)) < 20
			) {
				filteredConnections.push({ pointA, pointB });
			}
		});
	});

	return (
		<motion.svg
			className="absolute inset-0 w-full h-full"
			xmlns="http://www.w3.org/2000/svg"
		>
			{points.map((point, index) => (
				<motion.circle
					key={index}
					cx={point.x}
					cy={point.y}
					r="3"
					fill={point.color}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 + index * 0.03 }}
				/>
			))}
			{filteredConnections.map((connection, index) => (
				<motion.line
					key={`line-${index}`}
					x1={connection.pointA.x}
					y1={connection.pointA.y}
					x2={connection.pointB.x}
					y2={connection.pointB.y}
					stroke={connection.pointA.color}
					strokeWidth="1"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					transition={{ duration: 1, delay: 1 + index * 0.05 }}
				/>
			))}
		</motion.svg>
	);
}

function CoursesSection() {
	return (
		<section className="space-y-16 pb-8">
			<SectionHeader
				title="Nos Cursus"
				description="Des parcours complets pour devenir expert dans votre domaine."
			/>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-12 z-1">
				{[
					{
						title: "Développement Web",
						icon: <FaLaptopCode className="text-6xl text-[#00D1FF]" />,
						description:
							"Apprenez les fondamentaux et frameworks modernes pour créer des applications web performantes.",
						skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
						rating: 4,
					},
					{
						title: "Intelligence Artificielle",
						icon: <FaRobot className="text-6xl text-[#00D1FF]" />,
						description:
							"Développez des solutions IA avec Python, TensorFlow et apprenez les concepts clés du Machine Learning.",
						skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"],
						rating: 5,
					},
					{
						title: "Data Science",
						icon: <FaChartLine className="text-6xl text-[#00D1FF]" />,
						description:
							"Analysez et modélisez des données avec Python, SQL et des outils de DataViz pour prendre des décisions basées sur la donnée.",
						skills: ["Python", "Pandas", "SQL", "DataViz", "Statistiques"],
						rating: 4,
					},
					{
						title: "Développement Mobile",
						icon: <FaMobile className="text-6xl text-[#00D1FF]" />,
						description:
							"Maîtrisez les technologies mobiles comme React Native et Flutter pour créer des applications mobiles modernes.",
						skills: ["React Native", "Flutter", "Swift", "UX/UI Mobile"],
						rating: 5,
					},
				].map((course, index) => (
					<GlassCard
						key={index}
						title={course.title}
						icon={course.icon}
						description={course.description}
						skills={course.skills}
						rating={course.rating}
					/>
				))}
			</div>
		</section>
	);
}

function GlassCard({ title, icon, description, skills = [], rating, onClick }) {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="bg-[#6B8BA4] bg-opacity-30 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform cursor-pointer"
			onClick={onClick}
		>
			{icon}
			<h3 className="text-2xl font-semibold mt-6 text-[#E8F9FF]">{title}</h3>
			<p className="text-[#E8F9FF] mt-4 text-sm leading-relaxed">{description}</p>
			<div className="flex flex-wrap justify-center gap-2 mt-4">
				{skills.map((skill, idx) => (
					<span
						key={idx}
						className="bg-[#1A2B3C] bg-opacity-40 px-3 py-1 text-xs text-[#E8F9FF] rounded-full"
					>
						{skill}
					</span>
				))}
			</div>
			<div className="flex mt-6 space-x-1">
				{[...Array(5)].map((_, i) => (
					<FaStar
						key={i}
						className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-400"}`}
					/>
				))}
			</div>
		</motion.div>
	);
}

function TeachingMethodsSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			className="bg-[#1A2B3C] bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl p-16 text-center space-y-16"
		>
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]"
			>
				Nos Méthodes d'Enseignement
			</motion.h2>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
				className="text-xl text-[#E8F9FF] max-w-4xl mx-auto"
			>
				Découvrez notre approche unique qui allie théorie approfondie, apprentissage pratique, projets concrets et créativité. Chaque apprenant bénéficie d'un accompagnement personnalisé pour transformer ses ambitions en succès professionnel.
			</motion.p>
			<div className="flex flex-col lg:flex-row justify-center items-center gap-12">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="w-full lg:w-1/2 h-96"
				>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={teachingData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={120}
								fill="#8884d8"
								label={({ name }) => name}
							>
								{teachingData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.7 }}
					className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left"
				>
					{teachingData.map((method, index) => (
						<motion.div
							key={index}
							whileHover={{ scale: 1.05 }}
							className="flex items-center space-x-4 bg-[#4AB3E2] bg-opacity-10 p-6 rounded-xl shadow-lg"
						>
							<div className="text-4xl text-[#AEEFFF]">{method.icon}</div>
							<div>
								<h3 className="text-2xl font-semibold text-[#E8F9FF]">{method.name}</h3>
								<p className="text-sm text-[#E8F9FF] opacity-80">
									Nous croyons fermement en l'efficacité de cette approche pour façonner les experts de demain.
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}

function FormationsSection() {

	const formations = useSelector((state) => state.front.formations.data);
	console.log(formations);

	return (
		<section className="space-y-16  pb-8">
			<SectionHeader title="Nos Formations" description="Explorez nos modules de formation conçus pour tous les niveaux." />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
				{formations.map((formation, index) => (
					<GlassCard
						key={index}
						title={formation.title}
						description={formation.description}
						skills={formation.skills}
						rating={formation.rating}
						icon={<FaChalkboardTeacher className="text-6xl text-yellow-400" />}
						onClick={() => window.open(`/formation/${formation.customId}`, "_self")}
					/>
				))}
			</div>
		</section>
	);
}

function AboutSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			className="bg-[#1A2B3C] bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl p-16 text-center space-y-12"
		>
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]"
			>
				À propos de Skylonis
			</motion.h2>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
				className="text-xl text-[#E8F9FF] max-w-4xl mx-auto"
			>
				Skylonis, c'est l'histoire d'une passion pour le développement et la technologie, née de notre riche expérience au sein de l'école 42. Notre parcours nous a permis de réaliser de nombreux projets de développement innovants et de nous perfectionner dans la conception de solutions numériques robustes et performantes.
			</motion.p>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="text-xl text-[#E8F9FF] max-w-4xl mx-auto"
			>
				Nous croyons que la qualité est la pierre angulaire de tout apprentissage durable. C'est pourquoi nous avons obtenu la certification Qualiopi, garantissant l'excellence de nos formations professionnelles. Cette reconnaissance atteste de notre engagement à fournir un enseignement structuré, rigoureux et accessible à tous.
			</motion.p>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 0.7 }}
				className="flex justify-center items-center gap-12 flex-wrap"
			>
				<div className="flex flex-col items-center space-y-4 bg-[#4AB3E2] bg-opacity-10 p-6 rounded-xl shadow-lg w-72">
					<FaUniversity className="text-6xl text-[#AEEFFF]" />
					<h3 className="text-2xl font-semibold text-[#E8F9FF]">Expérience École 42</h3>
					<p className="text-sm text-[#E8F9FF] opacity-80">
						Une formation autodidacte et selective produisant des développeurs complets.
					</p>
				</div>
				<div className="flex flex-col items-center space-y-4 bg-[#4AB3E2] bg-opacity-10 p-6 rounded-xl shadow-lg w-72">
					<FaLaptopCode className="text-6xl text-[#AEEFFF]" />
					<h3 className="text-2xl font-semibold text-[#E8F9FF]">Projets Freelance</h3>
					<p className="text-sm text-[#E8F9FF] opacity-80">
						Des projets innovants, conçus pour répondre aux défis technologiques modernes.
					</p>
				</div>
				<div className="flex flex-col items-center space-y-4 bg-[#4AB3E2] bg-opacity-10 p-6 rounded-xl shadow-lg w-72 ">
					<FaAward className="text-6xl text-[#AEEFFF]" />
					<h3 className="text-2xl font-semibold text-[#E8F9FF]">Certification Qualiopi</h3>
					<p className="text-sm text-[#E8F9FF] opacity-80">
						Une garantie de qualité, attestant de notre engagement envers l'excellence pédagogique.
					</p>
				</div>
			</motion.div>
		</motion.section>
	);
}

function ContactSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			className="text-center space-y-8  pb-8"
		>
			<h2 className="text-4xl font-bold">Prêt à commencer ?</h2>
			<motion.div whileHover={{ scale: 1.1 }}>
				<Button className="bg-yellow-500 text-gray-900 rounded-3xl px-12 py-5 text-xl shadow-xl hover:bg-yellow-400 transition">
					Contactez-nous
				</Button>
			</motion.div>
		</motion.section>
	);
}

function SectionHeader({ title, description }) {
	return (
		<div className="text-center space-y-4">
			<h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
				{title}
			</h2>
			<p className="text-lg text-[#E8F9FF]">{description}</p>
		</div>
	);
}



