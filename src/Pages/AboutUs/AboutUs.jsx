import { motion } from "framer-motion";
import { FaUsers, FaBrain, FaLaptopCode, FaStar, FaStarHalf } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import * as echarts from "echarts";



function AboutUs() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto flex flex-col item-center justify-center pl-12 pr-12">

			{/* Notre Méthodologie */}
			<MethodologySection />

			<div className="flex flex-col items-center justify-center space-y-20 pb-12">
				<SatisfactionSection />
				<QualitySection />
				<JourneySection />
			</div>
		</motion.section>
	);
}

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
			La qualité est au cœur de nos formations.<br />Si vous n'êtes pas satisfait de notre prestation, nous nous engageons à vous rembourser intégralement.
			<br /><br />C'est pourquoi nous avons une note de satisfaction de 4.76/5 sur l'ensemble de nos formations.
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
		tooltip: {
			trigger: "item",
			formatter: "{b}"
		},
		series: [
			{
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				label: {
					show: true,
					position: "outside",
					color: "#E8F9FF",
					fontSize: 16,
				},
				labelLine: {
					show: true,
					lineStyle: {
						color: "#AEEFFF",
					},
				},
				data: [
					{ value: 20, name: "Introduction Théorique" },
					{ value: 20, name: "Exercices Pratiques" },
					{ value: 20, name: "Ateliers Collaboratifs" },
					{ value: 20, name: "Projets Concrets" },
					{ value: 20, name: "Feedback & Révisions" },
				],
				itemStyle: {
					borderRadius: 10,
					borderColor: "#1A2B3C",
					borderWidth: 2,
				},
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
			className="text-center  min-h-screen flex flex-col items-center justify-center space-y-12"
		>
			<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
				Notre Méthodologie
			</h2>
			<p className="text-xl max-w-5xl mx-auto">
				Notre approche pédagogique se décompose en cinq étapes essentielles garantissant un apprentissage complet : théorie, pratique, collaboration, projets réels et feedback continu.
			</p>
			<div className="w-full h-[500px]  rounded-2xl  p-6">
				<ReactECharts option={methodologyChart} style={{ height: "100%", width: "100%" }} />
			</div>
		</motion.div>
	);
};

const QualitySection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1, delay: 0.5 }}
		className="text-center space-y-8"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Nos Gages de Qualité
		</h2>
		<p className="text-xl max-w-5xl mx-auto">
			Skylonis est certifié <strong>Qualiopi</strong>, un gage de qualité garantissant la conformité et l'efficacité de nos processus de formation.
		</p>
		<img
			src="/images/qualiopi-badge.png"
			alt="Certification Qualiopi"
			className="w-24 mx-auto"
		/>
	</motion.div>
);

const JourneySection = () => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1, delay: 0.7 }}
		className="text-center space-y-8"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Notre Parcours
		</h2>
		<p className="text-xl max-w-5xl mx-auto">
			Notre aventure a commencé à l'école 42, où nous avons appris à résoudre des problèmes complexes en autonomie. Cette expérience unique a façonné notre vision de la formation : accessible, pratique et orientée résultats.
		</p>
		<Button className="bg-[#AEEFFF] text-[#1A2B3C] rounded-3xl px-16 py-5 text-xl shadow-2xl hover:bg-[#E8F9FF] transition">
			Rejoignez-Nous
		</Button>
	</motion.div>
);

export default AboutUs;

