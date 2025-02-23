import { motion } from "framer-motion";
import { FaUsers, FaBrain, FaLaptopCode } from "react-icons/fa";
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
			className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto flex flex-col item-center justify-center space-y-20 pl-12 pr-12"		>

			{/* Notre Méthodologie */}
			<MethodologySection />

			{/* Notre Équipe */}
			<TeamSection />

			{/* Gages de Qualité */}
			<QualitySection />

			{/* Notre Parcours */}
			<JourneySection />
		</motion.section>
	);
}

const MethodologySection = () => {
	const methodologyChart = {
		title: {
			text: "Cycle d'Apprentissage Skylonis",
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
			className="text-center space-y-12"
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

function FormationSunburstSection() {
	useEffect(() => {
		const sunburstChart = {
			title: {
				text: "Modules IA - Vue Globale",
				left: "center",
				textStyle: {
					color: "#E8F9FF",
					fontSize: 24,
					fontWeight: "bold",
				},
			},
			tooltip: {
				trigger: "item",
				formatter: "{b}: Niveau de difficulté {c}/5",
			},
			series: [
				{
					type: "sunburst",
					radius: ["15%", "80%"],
					sort: null,
					highlightPolicy: "ancestor",
					data: [
						{
							name: "Machine Learning",
							children: [
								{ name: "Supervised Learning", value: 3 },
								{ name: "Unsupervised Learning", value: 4 },
								{ name: "Reinforcement Learning", value: 5 },
								{ name: "Model Evaluation", value: 2 },
							],
						},
						{
							name: "Deep Learning",
							children: [
								{ name: "CNNs", value: 4 },
								{ name: "RNNs", value: 4 },
								{ name: "GANs", value: 5 },
								{ name: "Transformers", value: 5 },
								{ name: "Autoencoders", value: 3 },
							],
						},
						{
							name: "Natural Language Processing",
							children: [
								{ name: "Sentiment Analysis", value: 2 },
								{ name: "Named Entity Recognition", value: 3 },
								{ name: "Machine Translation", value: 4 },
								{ name: "BERT", value: 5 },
								{ name: "GPT", value: 5 },
							],
						},
						{
							name: "Computer Vision",
							children: [
								{ name: "Image Classification", value: 3 },
								{ name: "Object Detection", value: 4 },
								{ name: "Image Segmentation", value: 5 },
								{ name: "Edge Detection", value: 2 },
							],
						},
					],
					label: {
						rotate: "radial",
						color: "#E8F9FF",
						fontSize: 14,
					},
					levels: [
						{},
						{
							r0: "15%",
							r: "35%",
							label: { rotate: "tangential" },
						},
						{
							r0: "35%",
							r: "70%",
							label: { align: "right" },
						},
						{
							r0: "70%",
							r: "80%",
							itemStyle: {
								borderWidth: 3,
								borderColor: "#AEEFFF",
							},
						},
					],
					itemStyle: {
						borderWidth: 2,
						borderColor: "#1A2B3C",
					},
				},
			],
		};

		const myChart = echarts.init(document.getElementById("ia-sunburst"));
		sunburstChart && myChart.setOption(sunburstChart);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: -30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="text-center space-y-12"
		>
			<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
				🌟 Modules IA - Vue Globale 🌟
			</h2>
			<p className="text-xl max-w-5xl mx-auto">
				Découvrez notre large gamme de modules en Intelligence Artificielle, classés selon leur niveau de difficulté.
			</p>
			<div id="ia-sunburst" className="w-full h-[800px] bg-[#1A2B3C] rounded-2xl shadow-2xl p-6" />
		</motion.div>
	);
}

const TeamSection = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1, delay: 0.3 }}
		className="text-center space-y-12"
	>
		<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
			Notre Équipe
		</h2>
		<p className="text-xl max-w-5xl mx-auto">
			Une équipe de formateurs passionnés, issus de l'école 42, aux parcours variés sélectionnés pour leur expertise et leur pédagogie.
		</p>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
			{[
				{ name: "Pablo", role: "Développeur Fullstack", icon: <FaLaptopCode />, img: "https://wavefilesystem.s3.eu-west-3.amazonaws.com/images/1740256191362_67091cb9685bed5ab3af0a91-undefined.jpg" },
				{ name: "Christopher", role: "Spécialiste IA", icon: <FaBrain />, img: "https://wavefilesystem.s3.eu-west-3.amazonaws.com/images/1740235919619_67091cb9685bed5ab3af0a91-undefined.jpg" },
				{ name: "Redouane", role: "Développeur Big Data", icon: <FaUsers />, img: "https://wavefilesystem.s3.eu-west-3.amazonaws.com/images/1740235919619_67091cb9685bed5ab3af0a91-undefined.jpg" },
			].map((member, index) => (
				<motion.div
					key={index}
					whileHover={{ scale: 1.05 }}
					className="bg-[#4AB3E2] bg-opacity-10 p-8 rounded-2xl shadow-xl space-y-4 text-center flex flex-col items-center"
				>
					<img src={member.img} alt={member.name} className="h-42" />
					<h3 className="text-3xl font-semibold">{member.name}</h3>
					<div className=" text-[#AEEFFF] mx-auto flex fd-row items-center space-x-4">
						{member.icon}
						<p className="text-[#E8F9FF] opacity-80">{member.role}</p>
					</div>
				</motion.div>
			))}
		</div>
	</motion.div>
);

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

