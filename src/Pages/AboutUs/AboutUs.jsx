import { motion } from "framer-motion";
import { FaUsers, FaBrain, FaLaptopCode, FaStar, FaStarHalf } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import * as echarts from "echarts";
import vision from "../../assets/vision.svg";
import { Link } from "react-router-dom";

function AboutUs() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto flex flex-col item-center justify-center pl-12 pr-12"
		>
			<MethodologySection />
			<div className="flex flex-col items-center justify-center pb-12 gap-20 space-y-12">
				<IntroductionSection />
				<VisionSection />
				<MissionSection />
				<SatisfactionSection />
				<JourneySection />
			</div>
		</motion.section>
	);
}

const IntroductionSection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1 }}
		className="text-center space-y-12"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Qui Sommes-Nous ?
		</h2>
		<p className="text-xl max-w-7xl mx-auto">
			Chez Skylonis, nous sommes passionnés par l'innovation, la technologie et la transmission du savoir. Notre équipe est composée d'experts issus de différents horizons, tous animés par une vision commune : rendre la formation accessible, pertinente et inspirante pour tous. Nous croyons fermement que l'apprentissage ne se limite pas aux salles de classe, mais se vit à travers des projets, des collaborations et des expériences enrichissantes.
		</p>

	</motion.div>
);

const VisionSection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1, delay: 0.3 }}
		className="text-center space-y-8"
	>
		<div className="flex items-center justify-center space-x-4">
			{/* <p className="text-xl max-w-[50%] mx-auto">
				Nous rêvons d'un monde où la technologie est à la portée de tous et où chacun a l'opportunité d'apprendre, de grandir et de réussir. Notre vision est de devenir un acteur majeur de la formation technologique en offrant des parcours innovants, adaptés aux défis actuels et futurs. Nous aspirons à créer une communauté où le partage des connaissances et l'entraide sont les piliers du succès collectif.
			</p> */}
		</div>
	</motion.div>
);

const MissionSection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1, delay: 0.5 }}
		className="text-center space-y-12 px-8 md:px-16 lg:px-32"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Notre Mission
		</h2>

		<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center">
			<p className="text-lg leading-relaxed text-justify">
				Notre mission est de démocratiser l'accès à la formation en proposant des contenus
				de qualité, conçus par des experts et pensés pour répondre aux besoins du marché.<br />Nous
				nous engageons à offrir une expérience d'apprentissage immersive, pratique et
				enrichissante.<br /><br />À travers nos formations, nous visons à inspirer, guider et accompagner
				chaque apprenant dans son parcours professionnel et personnel.<br />Nous encourageons
				l'innovation, utilisons des technologies avancées, favorisons l'accessibilité pour tous
				et cherchons à motiver et stimuler l'engagement des apprenants.
			</p>

			<img
				src={vision}
				alt="Illustration de la mission"
				className="w-full h-auto rounded-lg"
			/>
		</div>
	</motion.div>
);

const SatisfactionSection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1 }}
		className="text-center space-y-8"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Satisfaction Garantie
		</h2>
		<p className="text-xl max-w-5xl mx-auto">
			La qualité est au cœur de nos formations. Si vous n'êtes pas satisfait, nous nous engageons à vous rembourser intégralement. Notre note de satisfaction de 4.76/5 témoigne de notre engagement envers l'excellence.
		</p>
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1, delay: 0.5 }}
			className="flex items-center justify-center space-x-4"
			viewport={{ once: true }}
		>
			{[...Array(4)].map((_, index) => (
				<FaStar key={index} className="text-[gold] text-4xl" />
			))}
			<FaStarHalf className="text-[gold] text-4xl" />
		</motion.div>
	</motion.div>
);

const MethodologySection = () => {
	const methodologyChart = {
		title: {
			text: "Notre méthodologie d'Apprentissage",
			left: "center",
			textStyle: {
				color: "#E8F9FF",
				fontSize: 22,
				fontWeight: "bold",
			},
		},
		tooltip: { trigger: "item", formatter: "{b}" },
		series: [
			{
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				label: { show: true, position: "outside", color: "#E8F9FF", fontSize: 16 },
				labelLine: { show: true, lineStyle: { color: "#AEEFFF" } },
				data: [
					{ value: 20, name: "Introduction Théorique" },
					{ value: 20, name: "Exercices Pratiques" },
					{ value: 20, name: "Ateliers Collaboratifs" },
					{ value: 20, name: "Projets Concrets" },
					{ value: 20, name: "Feedback & Révisions" },
				],
				itemStyle: { borderRadius: 10, borderColor: "#1A2B3C", borderWidth: 2 },
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(174, 239, 255, 0.5)",
					},
				},
			},
		],
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="text-center min-h-screen flex flex-col items-center justify-center space-y-12"
		>
			<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
				Notre Méthodologie
			</h2>
			<p className="text-xl max-w-5xl mx-auto">
				Notre approche pédagogique se décompose en cinq étapes essentielles garantissant un apprentissage complet : théorie, pratique, collaboration, projets réels et feedback continu.
			</p>
			<div className="w-full h-[500px] rounded-2xl p-6">
				<ReactECharts option={methodologyChart} style={{ height: "100%", width: "100%" }} />
			</div>
		</motion.div>
	);
};

const JourneySection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1, delay: 0.7 }}
		className="text-center  flex flex-col items-center justify-center gap-12"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Notre Parcours
		</h2>
		<p className="text-xl max-w-5xl mx-auto">
			Notre aventure a commencé à l'école 42, où nous avons appris à résoudre des problèmes complexes en autonomie. Cette expérience unique a façonné notre vision de la formation : accessible, pratique et orientée résultats. Depuis, nous avons formé des centaines de professionnels, développé des programmes innovants et contribué à la montée en compétences de nombreuses entreprises.
		</p>
		<Link to="/contact"
			className="text-lg font-semibold text-[#AEEFFF] hover:text-[#4AB3E2] transition duration-300 border-2 border-[#AEEFFF] hover:border-[#4AB3E2] px-4 py-2 rounded-lg"
		>
			Nous contacter
		</Link>
	</motion.div>
);

export default AboutUs;
