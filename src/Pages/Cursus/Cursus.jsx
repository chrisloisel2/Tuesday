import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { FaCode, FaCloud, FaDatabase, FaBrain } from "react-icons/fa";

const colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
const bgColor = "#2E2733";

function formatData(data) {
	const itemStyle = {
		star5: { color: colors[0] },
		star4: { color: colors[1] },
		star3: { color: colors[2] },
		star2: { color: colors[3] },
	};

	data.forEach((level1) => {
		if (level1.children) {
			level1.children.forEach((block) => {
				if (block.children) {
					block.children.forEach((starCategory) => {
						const styleKey = `star${starCategory.name ? starCategory.name[0] : ""}`;
						const style = itemStyle[styleKey] || { color: "#FFFFFF" }; // Fallback par défaut

						starCategory.label = { color: style.color };
						if (starCategory.children) {
							starCategory.children.forEach((item) => {
								item.value = 1;
								item.itemStyle = style;
								item.label = { color: style.color };
							});
						}
					});
				}
				block.itemStyle = { color: level1.itemStyle?.color || "#CCCCCC" };
			});
		}
	});
	return data;
}



function SunburstSection({ id, data }) {
	useEffect(() => {
		const chartDom = document.getElementById(id);
		const myChart = echarts.init(chartDom, "dark");

		const option = {
			backgroundColor: bgColor,
			color: colors,
			series: [
				{
					type: "sunburst",
					center: ["50%", "48%"],
					data: formatData(data),
					sort: (a, b) => (a.depth === 1 ? b.getValue() - a.getValue() : a.dataIndex - b.dataIndex),
					label: {
						rotate: "radial",
						color: bgColor,
					},
					itemStyle: {
						borderColor: bgColor,
						borderWidth: 2,
					},
					levels: [
						{},
						{
							r0: 0,
							r: 40,
							label: { rotate: 0 },
						},
						{
							r0: 40,
							r: 105,
						},
						{
							r0: 115,
							r: 140,
							itemStyle: { shadowBlur: 2, shadowColor: colors[2], color: "transparent" },
							label: { rotate: "tangential", fontSize: 10, color: colors[0] },
						},
						{
							r0: 140,
							r: 145,
							itemStyle: { shadowBlur: 80, shadowColor: colors[0] },
							label: {
								position: "outside",
								textShadowBlur: 5,
								textShadowColor: "#333",
							},
							downplay: { label: { opacity: 0.5 } },
						},
					],
				},
			],
		};

		myChart.setOption(option);
		return () => myChart.dispose();
	}, [id, data]);

	return <div id={id} className="w-full h-[900px]" />;
}



function CursusOverview({ title, description, icon: Icon, onClick }) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className="cursor-pointer bg-gradient-to-r from-[#1A2B3C]  to-[var(--icon-color)] bg-opacity-60 rounded-3xl shadow-2xl p-10 flex items-center space-x-8"
			onClick={onClick}
		>
			<Icon className="text-[#AEEFFF] text-7xl" />
			<div>
				<h3 className="text-4xl font-extrabold text-[#E8F9FF]">{title}</h3>
				<p className="text-lg text-[#E8F9FF] mt-4 max-w-xl leading-relaxed">{description}</p>
			</div>
		</motion.div>
	);
}

function CursusPage() {
	const [selectedCursus, setSelectedCursus] = useState(null);

	const cursusData = [
		{
			id: "devops-sunburst",
			title: "Cursus DevOps",
			description: "Maîtrisez l'intégration continue, les pipelines CI/CD, Docker et Kubernetes pour des déploiements performants.",
			icon: FaCloud,
			data: [
				{
					name: "CI/CD",
					children: [
						{
							name: "Jenkins",
							value: 3,
							link: "https://www.jenkins.io/",
							children: [
								{ name: "Image Classification", value: 3 },
								{ name: "Object Detection", value: 4 },
								{ name: "Image Segmentation", value: 5 },
								{ name: "Edge Detection", value: 2 },
							],
						},
						{ name: "GitLab CI", value: 4, link: "https://docs.gitlab.com/ee/ci/" },
						{ name: "GitHub Actions", value: 3, link: "https://docs.github.com/en/actions" },
						{ name: "CircleCI", value: 2, link: "https://circleci.com/docs/" },
					],
				},
				{
					name: "Containers",
					children: [
						{ name: "Docker", value: 2, link: "https://docs.docker.com/" },
						{ name: "Podman", value: 2, link: "https://podman.io/" },
						{ name: "Kubernetes", value: 5, link: "https://kubernetes.io/docs/" },
						{ name: "Helm", value: 3, link: "https://helm.sh/docs/" },
					],
				},
				{
					name: "Cloud",
					children: [
						{ name: "AWS", value: 4, link: "https://aws.amazon.com/" },
						{ name: "Azure", value: 3, link: "https://azure.microsoft.com/" },
						{ name: "GCP", value: 3, link: "https://cloud.google.com/" },
					],
				},
				{
					name: "Infrastructure as Code",
					children: [
						{ name: "Terraform", value: 4, link: "https://www.terraform.io/" },
						{ name: "Ansible", value: 3, link: "https://docs.ansible.com/" },
						{ name: "Pulumi", value: 2, link: "https://www.pulumi.com/" },
					],
				},
				{
					name: "Monitoring & Logging",
					children: [
						{ name: "Prometheus", value: 3, link: "https://prometheus.io/docs/" },
						{ name: "Grafana", value: 2, link: "https://grafana.com/docs/" },
						{ name: "ELK Stack", value: 4, link: "https://www.elastic.co/what-is/elk-stack" },
					],
				},
				{
					name: "Security",
					children: [
						{ name: "SonarQube", value: 4, link: "https://www.sonarqube.org/" },
						{ name: "Vault", value: 3, link: "https://www.vaultproject.io/" },
						{ name: "Trivy", value: 2, link: "https://aquasecurity.github.io/trivy/" },
					],
				},
			],
		},
		{
			id: "webdev-sunburst",
			title: "Cursus Développement Web",
			description: "Découvrez le développement web complet avec React.js, Next.js et les meilleures pratiques back-end.",
			icon: FaCode,
			data: [
				{ name: "Frontend", children: [{ name: "React.js", value: 3 }, { name: "Vue.js", value: 3 }] },
				{ name: "Backend", children: [{ name: "Node.js", value: 3 }, { name: "NestJS", value: 4 }] },
			],
		},
		{
			id: "ia-sunburst",
			title: "Cursus Intelligence Artificielle",
			description: "Explorez les secrets du Machine Learning, du Deep Learning et des réseaux de neurones modernes.",
			icon: FaBrain,
			data: [
				{ name: "Machine Learning", children: [{ name: "Supervised Learning", value: 3 }, { name: "Reinforcement Learning", value: 5 }] },
				{ name: "Deep Learning", children: [{ name: "CNNs", value: 4 }, { name: "GANs", value: 5 }] },
			],
		},
		{
			id: "bigdata-sunburst",
			title: "Cursus Big Data",
			description: "Manipulez des données massives avec Hadoop, Spark et découvrez les solutions de stockage avancées.",
			icon: FaDatabase,
			data: [
				{ name: "Data Processing", children: [{ name: "Hadoop", value: 4 }, { name: "Spark", value: 5 }] },
				{ name: "Data Storage", children: [{ name: "Hive", value: 3 }, { name: "HBase", value: 4 }] },
			],
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto pl-12 pr-12 pt-12 flex flex-col item-center justify-center">
			{!selectedCursus ? (
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 gap-12"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					{cursusData.map((cursus) => (
						<CursusOverview
							key={cursus.id}
							title={cursus.title}
							description={cursus.description}
							icon={cursus.icon}
							onClick={() => setSelectedCursus(cursus)}
						/>
					))}
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<button
						className="bg-[#AEEFFF] text-[var(-icon-color)] rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
						onClick={() => setSelectedCursus(null)}
					>
						Retour
					</button>
					<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
						{selectedCursus.title}
					</h2>
					<p className="text-xl text-[#E8F9FF] max-w-5xl mx-auto">
						{selectedCursus.description}
					</p>
					<SunburstSection id={selectedCursus.id} data={selectedCursus.data} />
				</motion.div>
			)}
		</div>
	);
}

export default CursusPage;
