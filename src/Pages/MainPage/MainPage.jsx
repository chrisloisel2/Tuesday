import { motion } from "framer-motion";
import {
	FaUniversity,
	FaChalkboardTeacher,
	FaAward,
	FaCheckCircle,
	FaUsers,
	FaLaptopCode,
	FaRobot,
	FaChartLine,
	FaLinkedin,
	FaEnvelope,
	FaPhoneAlt,
	FaMapMarkerAlt,
	FaBookOpen,
	FaLightbulb,
	FaHandsHelping,
	FaProjectDiagram,
	FaChartPie,
	FaGraduationCap,
	FaCode,
	FaStar,
} from "react-icons/fa";
import ReactECharts from "echarts-for-react";
import { Button } from "../../components/ui/button";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const COLORS = ["#AEEFFF", "#4AB3E2", "#1A2B3C", "#E8F9FF", "#6B8BA4"];

const teachingData = [
	{ name: "Apprentissage Pratique", value: 45, icon: <FaHandsHelping />, color: "#AE0E40" },
	{ name: "Projets Concrets", value: 25, icon: <FaProjectDiagram />, color: "#9A031E" },
	{ name: "Approfondissement Théorique", value: 15, icon: <FaBookOpen />, color: "#FB8B24" },
	{ name: "Innovation et Créativité", value: 10, icon: <FaLightbulb />, color: "#E36414" },
	{ name: "Suivi Personnalisé", value: 5, icon: <FaChartPie />, color: "#0F4C5C" },
];


export default function PresentationPage() {
	return (
		<>
			<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto space-y-32 pl-12 pr-12">
				<HeroSection />
				<CoursesSection />
				<TeachingMethodsSection />
				<FormationsSection />
				<AboutSection />
				<ContactSection />
				<FooterSection />
			</div>
		</>
	);
}


function HeroSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="min-h-screen flex flex-col justify-center items-center text-center space-y-8 pt-40"
		>
			<BackgroundNeuralNetwork />
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
				<Button className="bg-[#AEEFFF] text-[#1A2B3C] rounded-3xl px-12 py-5 text-xl shadow-xl hover:bg-[#E8F9FF] transition">
					Explorer Maintenant
				</Button>
			</motion.div>
		</motion.section>
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
			className="absolute inset-0 w-full h-full z-0"
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
			<SectionHeader title="Nos Cursus" description="Des parcours complets pour devenir expert dans votre domaine." />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 z-1">
				{[
					{ title: "Développement Web", icon: <FaLaptopCode className="text-6xl text-[#AEEFFF]" /> },
					{ title: "Intelligence Artificielle", icon: <FaRobot className="text-6xl text-[#E8F9FF]" /> },
					{ title: "Data Science", icon: <FaChartLine className="text-6xl text-[#4AB3E2]" /> },
				].map((course, index) => (
					<GlassCard key={index} title={course.title} icon={course.icon} />
				))}
			</div>
		</section>
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
	return (
		<section className="space-y-16  pb-8">
			<SectionHeader title="Nos Formations" description="Explorez nos modules de formation conçus pour tous les niveaux." />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
				{[...Array(6)].map((_, index) => (
					<GlassCard
						key={index}
						title={`Formation Placeholder ${index + 1}`}
						icon={<FaChalkboardTeacher className="text-6xl text-yellow-400" />}
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
						Une formation autodidacte et rigoureuse qui forge des développeurs complets et adaptables.
					</p>
				</div>
				<div className="flex flex-col items-center space-y-4 bg-[#4AB3E2] bg-opacity-10 p-6 rounded-xl shadow-lg w-72">
					<FaLaptopCode className="text-6xl text-[#AEEFFF]" />
					<h3 className="text-2xl font-semibold text-[#E8F9FF]">Projets Développement</h3>
					<p className="text-sm text-[#E8F9FF] opacity-80">
						Des projets innovants, conçus pour répondre aux défis technologiques modernes.
					</p>
				</div>
				<div className="flex flex-col items-center space-y-4 bg-[#4AB3E2] bg-opacity-10 p-6 rounded-xl shadow-lg w-72">
					<FaAward className="text-6xl text-[#AEEFFF]" />
					<h3 className="text-2xl font-semibold text-[#E8F9FF]">Certification Qualiopi</h3>
					<p className="text-sm text-[#E8F9FF] opacity-80">
						Une garantie de qualité, attestant de notre engagement envers l'excellence pédagogique.
					</p>
					<br />
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

function GlassCard({ title, icon }) {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="bg-[#6B8BA4] bg-opacity-30  rounded-2xl shadow-lg p-10 flex flex-col items-center text-center transition-transform"
		>
			{icon}
			<h3 className="text-2xl font-semibold mt-6 text-[#E8F9FF]">{title}</h3>
			<div className="w-full h-40 bg-[#1A2B3C] bg-opacity-20 rounded-xl mt-6" /> {/* Placeholder Image */}
		</motion.div>
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
					href="https://www.linkedin.com"
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

